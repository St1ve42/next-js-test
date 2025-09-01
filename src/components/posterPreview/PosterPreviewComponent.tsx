import type {MovieType} from "@/models/MovieType.ts";
import type {FC} from "react";
import type {MovieDetailsType} from "@/models/MovieDetailsType.ts";
import Image from "next/image";

type PropsType = {
    movie: MovieType | MovieDetailsType,
    width?: number
}

export const PosterPreviewComponent: FC<PropsType> = ({movie}) => {
    return (
        <Image width={400} height={500} priority={true} src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
    );
};