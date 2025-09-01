import {Metadata} from "next";
import {notFound} from "next/navigation";
import {MovieInfoComponent} from "@/components/movieInfo/MovieInfoComponent.tsx";
import {getMovieById} from "@/service/api.service.ts";

type PropsType = {
    params: Promise<{movieId: string | string[] | undefined}>
}

export const generateMetadata = async ({params}: PropsType): Promise<Metadata> => {
    const {movieId} = await params
    const movieIdValue = movieId ? movieId : "1"
    const movie = await getMovieById(Number(movieIdValue))
    if(!movie){
        notFound()
    }
    return {
        title: movie.title,
        description: movie.overview,
    }
}

const MovieDetailsPage = async({params}: PropsType) => {
    const {movieId} = await params
    const movieIdValue = movieId ? movieId : "1"
    if(!Number(movieIdValue)){
        notFound()
    }
    return (
        <MovieInfoComponent movieId={Number(movieIdValue)}/>
    )
}

export default MovieDetailsPage