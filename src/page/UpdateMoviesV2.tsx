import React, { useEffect, useMemo, useRef, useState } from "react";
import { AddMovie, UpdateBlurImageAPI, UpdateMoviesAPI, getKMovie, getMovie, getMoviePerPage } from "../repositories/api/movie";
import { ImovieList } from "../repositories/interface/movie";
import { useParams } from "react-router";
import { useNavigate, useSearchParams } from "react-router-dom";

// ============================================================
// CONSTANTS
// ============================================================
const TOTAL_PAGES = 1094;

// ============================================================
// TYPES
// ============================================================
type SyncStatus = "idle" | "running" | "retrying" | "done" | "stopped";

// ============================================================
// HELPERS: Bọc các API dạng callback thành Promise
// ============================================================

const fetchMoviePage = (page: number): Promise<any[]> =>
  new Promise((resolve, reject) => {
    getMoviePerPage(page.toString(), (data) => {
      if (data) resolve(data);
      else reject(new Error(`Không lấy được trang ${page}`));
    });
  });

const fetchMovieDetail = (slug: string): Promise<any> =>
  new Promise((resolve, reject) => {
    getMovie(slug, resolve, undefined, () => reject(new Error(`Không lấy được detail: ${slug}`)));
  });

const updateMovie = (payload: any): Promise<boolean> =>
  new Promise((resolve, reject) => {
    UpdateMoviesAPI(
      payload,
      (isUpdated) => resolve(!!isUpdated),
      undefined,
      () => reject(new Error(`UpdateMoviesAPI thất bại: ${payload.slug}`)),
    );
  });

const addMovie = (payload: any): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    // Bọc resolve để bỏ qua tham số data trả về (chỉ cần biết thành công/thất bại)
    AddMovie(
      payload,
      (_data) => resolve(),
      undefined,
      () => reject(new Error(`AddMovie thất bại: ${payload.slug}`)),
    );
  });

// ============================================================
// CORE: Xử lý một phim — update hoặc insert
// Trả về true nếu thành công
// ============================================================
const processOneMovie = async (item: any): Promise<boolean> => {
  try {
    const movieDetail = await fetchMovieDetail(item.slug);
    const payload = {
      ...item,
      category: movieDetail.movie.category,
      episode_current: movieDetail.movie.episode_current,
      episode_total: movieDetail.movie.episode_total,
      year: movieDetail.movie.year,
      type: movieDetail.movie.type,
      status: movieDetail.movie.status,
      time: movieDetail.movie.time,
      view: movieDetail.movie.view,
      chieurap: movieDetail.movie.chieurap,
      country: movieDetail.movie.country,
      lang: movieDetail.movie.lang,
    };

    const isUpdated = await updateMovie(payload);
    if (!isUpdated) await addMovie(payload);

    return true;
  } catch (err) {
    console.error(`[FAIL] ${item.slug}`, err);
    return false;
  }
};

// ============================================================
// COMPONENT
// ============================================================
const UpdateMoviesV2 = () => {
  const [searchParams] = useSearchParams();

  // Input nhập trang bắt đầu (chưa apply)
  const [startPageInput, setStartPageInput] = useState<string>(searchParams.get("page") || "1");
  // Trang bắt đầu thực sự khi nhấn Start
  const [startPage, setStartPage] = useState<number>(parseInt(searchParams.get("page") || "1"));

  const [status, setStatus] = useState<SyncStatus>("idle");
  const [currentPage, setCurrentPage] = useState<number>(startPage);
  const [totalProcessed, setTotalProcessed] = useState<number>(0);
  const [totalSuccess, setTotalSuccess] = useState<number>(0);

  // Phim lỗi trong lần sync chính (Set để dễ xóa từng phần tử)
  const [errorMovies, setErrorMovies] = useState<string[]>([]);

  // Phim vẫn lỗi sau retry tự động
  const [retryErrorMovies, setRetryErrorMovies] = useState<string[]>([]);

  // Slug đang trong quá trình xử lý retry (để hiện spinner)
  const [retryingSet, setRetryingSet] = useState<Set<string>>(new Set());

  // Ref để dừng vòng lặp từ bên ngoài
  const shouldStop = useRef(false);

  useEffect(() => {
    return () => {
      shouldStop.current = true;
    };
  }, []);

  // ============================================================
  // BƯỚC 1: Đồng bộ tuần tự từng trang
  // ============================================================
  const startSync = async () => {
    const page = parseInt(startPageInput) || 1;
    setStartPage(page);
    setCurrentPage(page);
    setTotalProcessed(0);
    setTotalSuccess(0);
    setErrorMovies([]);
    setRetryErrorMovies([]);
    shouldStop.current = false;
    setStatus("running");

    const allErrorSlugs: string[] = [];

    for (let p = page; p <= TOTAL_PAGES; p++) {
      // Kiểm tra tín hiệu dừng
      if (shouldStop.current) {
        setStatus("stopped");
        return;
      }

      setCurrentPage(p);
      console.log(`[PAGE ${p}/${TOTAL_PAGES}] Đang fetch...`);

      let movieList: any[] = [];
      try {
        movieList = await fetchMoviePage(p);
      } catch (err) {
        console.error(`[PAGE ${p}] Fetch thất bại, bỏ qua.`, err);
        continue;
      }

      // Xử lý song song toàn bộ phim trong trang, chờ đến khi xong hết
      const results = await Promise.all(movieList.map((item) => processOneMovie(item)));

      const successCount = results.filter(Boolean).length;
      const failedSlugs = movieList.filter((_, i) => !results[i]).map((m) => m.slug);

      allErrorSlugs.push(...failedSlugs);
      setTotalProcessed((prev) => prev + movieList.length);
      setTotalSuccess((prev) => prev + successCount);
      if (failedSlugs.length > 0) {
        setErrorMovies((prev) => [...prev, ...failedSlugs]);
      }
    }

    // Tự động retry sau khi xong tất cả trang
    if (allErrorSlugs.length > 0) {
      await autoRetryErrors(allErrorSlugs);
    }

    setStatus("done");
  };

  // ============================================================
  // BƯỚC 2: Tự động retry toàn bộ phim lỗi sau khi sync xong
  // ============================================================
  const autoRetryErrors = async (slugs: string[]) => {
    setStatus("retrying");
    setRetryingSet(new Set(slugs));
    console.log(`[AUTO RETRY] Retry ${slugs.length} phim...`);

    const results = await Promise.all(
      slugs.map(async (slug) => {
        const ok = await processOneMovie({ slug });
        return { slug, ok };
      }),
    );

    const stillFailed = results.filter((r) => !r.ok).map((r) => r.slug);
    const retrySuccess = results.filter((r) => r.ok).length;

    // Xóa các slug đã retry thành công khỏi errorMovies
    const succeededSlugs = new Set(results.filter((r) => r.ok).map((r) => r.slug));
    setErrorMovies((prev) => prev.filter((s) => !succeededSlugs.has(s)));
    setTotalSuccess((prev) => prev + retrySuccess);
    setRetryErrorMovies(stillFailed);
    setRetryingSet(new Set());
  };

  // ============================================================
  // Retry thủ công từng phim lỗi — xóa khỏi danh sách nếu thành công
  // ============================================================
  const retryOneMovie = async (slug: string, fromRetryList: boolean) => {
    // Đánh dấu slug đang xử lý
    setRetryingSet((prev) => new Set(prev).add(slug));

    const ok = await processOneMovie({ slug });

    setRetryingSet((prev) => {
      const next = new Set(prev);
      next.delete(slug);
      return next;
    });

    if (ok) {
      // Thành công → xóa khỏi danh sách tương ứng
      setTotalSuccess((prev) => prev + 1);
      if (fromRetryList) {
        setRetryErrorMovies((prev) => prev.filter((s) => s !== slug));
      } else {
        setErrorMovies((prev) => prev.filter((s) => s !== slug));
      }
      console.log(`[MANUAL RETRY OK] ${slug}`);
    } else {
      // Vẫn lỗi → chuyển sang retryErrorMovies (nếu chưa có)
      if (!fromRetryList) {
        setErrorMovies((prev) => prev.filter((s) => s !== slug));
        setRetryErrorMovies((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
      }
      console.error(`[MANUAL RETRY FAIL] ${slug}`);
    }
  };

  // Retry toàn bộ một danh sách thủ công
  const retryAllInList = async (slugs: string[], fromRetryList: boolean) => {
    await Promise.all(slugs.map((s) => retryOneMovie(s, fromRetryList)));
  };

  // ============================================================
  // RENDER
  // ============================================================
  const progressPercent = Math.round(((currentPage - startPage) / Math.max(TOTAL_PAGES - startPage, 1)) * 100);
  const canStart = status === "idle" || status === "stopped" || status === "done";

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-mono">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">🎬 Movie Sync Tool</h1>

      {/* ===== CONTROLS ===== */}
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        {/* Input trang bắt đầu — chỉ chỉnh được khi chưa chạy */}
        <div className="flex items-center gap-2 bg-gray-800 rounded-lg px-4 py-2">
          <label className="text-gray-400 text-sm whitespace-nowrap">Trang bắt đầu:</label>
          <input
            type="number"
            min={1}
            max={TOTAL_PAGES}
            value={startPageInput}
            onChange={(e) => setStartPageInput(e.target.value)}
            disabled={status === "running" || status === "retrying"}
            className="w-24 bg-gray-700 rounded px-2 py-1 text-white text-center
                       disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-500 text-sm">/ {TOTAL_PAGES}</span>
        </div>

        {/* Nút Start */}
        {canStart && (
          <button onClick={startSync} className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-lg font-bold transition-colors">
            ▶ {status === "idle" ? "Bắt đầu" : "Chạy lại"}
          </button>
        )}

        {/* Nút Stop */}
        {(status === "running" || status === "retrying") && (
          <button
            onClick={() => {
              shouldStop.current = true;
            }}
            className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition-colors"
          >
            ⏹ Dừng
          </button>
        )}
      </div>

      {/* ===== STATUS ===== */}
      <StatusBadge status={status} />

      {/* ===== PROGRESS BAR ===== */}
      <div className="mb-6 bg-gray-800 rounded-xl p-5">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-gray-400">Tiến trình trang</span>
          <span className="text-2xl font-bold">
            {currentPage}
            <span className="text-gray-500 text-base"> / {TOTAL_PAGES}</span>
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div className="bg-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
        </div>
        <div className="text-right text-sm text-gray-400 mt-1">{progressPercent}%</div>
      </div>

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="✅ Thành công" value={totalSuccess} color="green" />
        <StatCard label="📦 Đã xử lý" value={totalProcessed} color="blue" />
        <StatCard label="❌ Tổng lỗi" value={errorMovies.length + retryErrorMovies.length} color="red" />
      </div>

      {/* ===== ERROR LIST — Lỗi lần đầu ===== */}
      {errorMovies.length > 0 && (
        <ErrorSection
          title={`⚠️ Lỗi lần đầu (${errorMovies.length} phim)`}
          color="orange"
          slugs={errorMovies}
          retryingSet={retryingSet}
          onRetryOne={(slug) => retryOneMovie(slug, false)}
          onRetryAll={() => retryAllInList(errorMovies, false)}
        />
      )}

      {/* ===== ERROR LIST — Vẫn lỗi sau retry ===== */}
      {retryErrorMovies.length > 0 && (
        <ErrorSection
          title={`🚨 Vẫn lỗi sau retry (${retryErrorMovies.length} phim)`}
          color="red"
          slugs={retryErrorMovies}
          retryingSet={retryingSet}
          onRetryOne={(slug) => retryOneMovie(slug, true)}
          onRetryAll={() => retryAllInList(retryErrorMovies, true)}
        />
      )}

      {/* Hoàn tất không lỗi */}
      {status === "done" && errorMovies.length === 0 && retryErrorMovies.length === 0 && (
        <div className="text-green-400 text-xl font-bold mt-4">🎉 Tất cả phim đã được đồng bộ thành công!</div>
      )}
    </div>
  );
};

// ============================================================
// SUB-COMPONENT: Danh sách phim lỗi với nút retry
// ============================================================
const ErrorSection = ({
  title,
  color,
  slugs,
  retryingSet,
  onRetryOne,
  onRetryAll,
}: {
  title: string;
  color: "orange" | "red";
  slugs: string[];
  retryingSet: Set<string>;
  onRetryOne: (slug: string) => void;
  onRetryAll: () => void;
}) => {
  const borderMap = { orange: "border-orange-500", red: "border-red-500" };
  return (
    <div className={`mb-6 bg-gray-800 rounded-xl p-5 border-l-4 ${borderMap[color]}`}>
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <span className="font-bold text-lg">{title}</span>
        <button onClick={onRetryAll} className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-sm font-bold transition-colors">
          🔁 Retry tất cả
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-1 pr-1">
        {slugs.map((slug) => {
          const isRetrying = retryingSet.has(slug);
          return (
            <div key={slug} className="flex items-center justify-between bg-gray-700 rounded-lg px-3 py-2 gap-2">
              <span className="text-sm text-gray-300 break-all">{slug}</span>
              <button
                onClick={() => onRetryOne(slug)}
                disabled={isRetrying}
                className="shrink-0 px-3 py-1 bg-blue-700 hover:bg-blue-600 disabled:bg-gray-600
                           rounded text-xs font-bold transition-colors disabled:cursor-not-allowed"
              >
                {isRetrying ? "⏳..." : "Retry"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================================
// SUB-COMPONENTS: StatCard, StatusBadge
// ============================================================
const StatCard = ({ label, value, color }: { label: string; value: number; color: "green" | "blue" | "red" }) => {
  const colorMap = { green: "text-green-400", blue: "text-blue-400", red: "text-red-400" };
  return (
    <div className="bg-gray-800 rounded-xl p-4 text-center">
      <div className="text-sm text-gray-400 mb-1">{label}</div>
      <div className={`text-4xl font-bold ${colorMap[color]}`}>{value}</div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: SyncStatus }) => {
  const map: Record<SyncStatus, { label: string; cls: string }> = {
    idle: { label: "⏸ Chưa bắt đầu", cls: "bg-gray-600" },
    running: { label: "⚡ Đang đồng bộ...", cls: "bg-blue-600 animate-pulse" },
    retrying: { label: "🔄 Đang retry...", cls: "bg-yellow-600 animate-pulse" },
    done: { label: "🎉 Hoàn tất!", cls: "bg-green-600" },
    stopped: { label: "⏹ Đã dừng", cls: "bg-red-700" },
  };
  const { label, cls } = map[status];
  return <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold mb-6 ${cls}`}>{label}</span>;
};

export default UpdateMoviesV2;
