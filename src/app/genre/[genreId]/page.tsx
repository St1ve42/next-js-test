import {Metadata} from "next";
import {notFound} from "next/navigation";
import {MovieListsComponent} from "@/components/movieLists/MovieListsComponent.tsx";
import {getGenreIdObj} from "@/components/movieLists/utils.ts";
import {capitalizeFirstLetter} from "@/utils/utils.ts";

type PropsType = {
    params: Promise<{genreId: string | undefined}>
    searchParams: Promise<{page: string | undefined, option: string | undefined, direction: string | undefined}>
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
    const {page, option, direction} = await searchParams
    const genreIdObj = await getGenreIdObj()
    const genreIdValue = genreId ? genreId : '28'
    const pageValue = page ? page : '1'
    const optionValue = option ? option : 'popularity'
    const directionValue = direction ? direction : 'desc'
    if(!Number(genreIdValue) || (genreIdObj && !genreIdObj[Number(genreIdValue)]) || !Number(pageValue)){
        notFound()
    }
    return (
        <MovieListsComponent genreId={Number(genreIdValue)} searchParams={{page: Number(pageValue), option: optionValue, direction: directionValue}}/>
    )
}

export default MovieListsPage