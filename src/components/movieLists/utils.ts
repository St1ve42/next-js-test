import {getGenres} from "@/service/api.service.ts";

type GenreIdObjType = {
    [key: number]: string
} | undefined

export const getGenreIdObj = async(): Promise<GenreIdObjType> => {
    const genres = await getGenres()
    return genres?.reduce((accum: {[key: number]: string}, genre) => {
        accum[genre.id] = genre.name.toLowerCase()
        return accum
    }, {})
}

export const pageNumerationArray = (InitialPageOfNumeration: number): number[] => {
    if(InitialPageOfNumeration > 498){
        InitialPageOfNumeration = 498
    }
    if(InitialPageOfNumeration <= 1){
        InitialPageOfNumeration = 1
    }
    const pages: number[] = []
    for (let i = InitialPageOfNumeration; i < InitialPageOfNumeration + 3; i++) {
        pages.push(i)
    }
    return pages
}