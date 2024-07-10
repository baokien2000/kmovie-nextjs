import MovieListTitle from "@/components/movies/list/movie-list-title";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/movies/list/movie-list-skeleton";
import MoviesSliderSkeleton from "@/components/movies/slider/movies-slider-skeleton";
import SliderContainer from "@/components/movies/slider/slider-container";
import HomeContainer from "@/containers/home/home-container";

// export const dynamic = process.env.NEXT_PUBLIC_MODE === "development" ? "auto" : "force-dynamic";
// const MovieSlider = nextDynamic(() => import("@/components/movies/slider/slider"), {
//     ssr: false,
//     loading: () => <MoviesSliderSkeleton />,
// });

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    // const initialData = await getKMovie(searchParams?.page ? parseInt(searchParams.page) : 1, pageSize, "");
    return (
        <main className="md:p-6 sm:p-3 py-3  ">
            <div className="space-y-3 ">
                <MovieListTitle title="Phim đề xuất" />
                <Suspense fallback={<MoviesSliderSkeleton />}>
                    <SliderContainer />
                </Suspense>
            </div>

            <div className="space-y-3 ">
                <MovieListTitle id={"MovieListTitle"} title="Phim mới cập nhật" />
                <Suspense fallback={<MovieListSkeleton />}>
                    {/* <MovieListContainer titleId="MovieListTitle" initialData={initialData} searchParams={searchParams} /> */}
                    <HomeContainer searchParams={searchParams} />
                </Suspense>
            </div>
        </main>
    );
}
