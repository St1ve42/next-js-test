import {Metadata} from "next";
import {notFound} from "next/navigation";
import {MovieListsComponent} from "@/components/movieLists/MovieListsComponent.tsx";
import {getGenreIdObj} from "@/components/movieLists/utils.ts";
import {capitalizeFirstLetter} from "@/utils/utils.ts";

type PropsType = {
    params: Promise<{genreId: string | string[] | undefined}>
    searchParams: Promise<{page: string | string[] | undefined}>
}

export const generateMetadata = async ({params}: PropsType): Promise<Metadata> => {
    const {genreId} = await params
    const genreIdObj = await getGenreIdObj()
    if(!genreIdObj){
        notFound()
    }
    return {
        title: capitalizeFirstLetter(genreIdObj[Number(genreId)]),
        description: `Films with specific genre`
    }
}

const MovieListsPage = async({params, searchParams}: PropsType) => {
    const {genreId} = await params
    const {page} = await searchParams
    const genreIdObj = await getGenreIdObj()
    const pageValue = page ? page : '1'
    const genreIdValue = genreId ? genreId : '28'
    if(!Number(genreIdValue) || (genreIdObj && !genreIdObj[Number(genreIdValue)]) || !Number(pageValue)){
        notFound()
    }
    return (
        <MovieListsComponent genreId={Number(genreIdValue)} page={Number(pageValue)}/>
    )
}

export default MovieListsPage