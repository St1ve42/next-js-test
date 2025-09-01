import type {FC} from "react";
import type {MovieType} from "@/models/MovieType.ts";
import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MoviesListCardStyle.css'
import Link from "next/link";
import {getDate, STUB} from "@/utils/utils.ts";
import {ImageNotFoundComponent} from "@/components/imageNotFound/ImageNotFoundComponent.tsx";

type propsType = {
    movie: MovieType
}
export const MovieListCardComponent: FC<propsType> = ({movie}) => {
    const release_date: Date | string[] | string = getDate(movie.release_date)
    return (
        <Link href = {`/movie/${movie.id}`}>
            <div className="bg-black w-[200px] h-[404px] flex flex-col gap-1 card mb-2 m-auto">
                <div className="w-[200px] h-[300px]">
                    {movie.poster_path ? <PosterPreviewComponent movie={movie}/> : <ImageNotFoundComponent/>}
                </div>
                <p className="ml-3 mb-1 max-w-[170px]">{movie.title ? movie.title : STUB}</p>
                <p className="ml-3 mb-1">{release_date}</p>
            </div>
        </Link>
    );
};
