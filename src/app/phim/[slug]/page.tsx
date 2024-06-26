import Action from "@/containers/(movie)/movie-details/action";
import CommentList from "@/containers/(movie)/movie-comment";
import Description from "@/containers/(movie)/movie-details/description";
import Info from "@/containers/(movie)/movie-details/info";
import { getKMovie, getMovieBySlug } from "@/services/movies";
import React from "react";
import EpisodesList from "@/containers/(movie)/movie-details/episodes";
import { Metadata } from "next";
import { ImovieList } from "@/interface/movies";

interface PageProps {
    params: {
        slug: string;
    };
}
export async function generateStaticParams() {
    const movies: ImovieList = await getKMovie(1, 24, "");

    return movies.items.map((movie) => ({
        slug: movie.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: {
        slug: string;
    };
}): Promise<Metadata> {
    const slug = params.slug;

    const movie = await getMovieBySlug(slug);
    return {
        title: movie ? `${movie.movie.name} - kmovie` : "404 - kmovie",
    };
}

export default async function Page({ params }: PageProps) {
    const movie = await getMovieBySlug(params.slug);
    if (!movie) return <div>404</div>;
    return (
        <main className="p-6 py-4 space-y-3">
            <Info movie={movie.movie} />
            <Action slug={params.slug} episodes={movie.episodes[0].server_data[0]} isTrailer={movie.movie.episode_current === "Trailer"} />
            <div className="flex sm:flex-row flex-col gap-3 text-[#ccc] ">
                <EpisodesList
                    trailerUrl={movie.movie.episode_current === "Trailer" ? movie.movie.trailer_url : null}
                    slug={params.slug}
                    episodes={movie.episodes[0].server_data}
                />
                <Description content={movie.movie.content} />
            </div>
            <CommentList id={movie.movie._id} />
        </main>
    );
}
