import {DataMovieType} from "@/models/MovieType.ts";
import {GenreType} from "@/models/GenreType.ts";
import {MovieDetailsType} from "@/models/MovieDetailsType.ts";
import {ImageType} from "@/models/ImageType.ts";
import {MovieVideoType} from "@/models/VideoType.ts";
import {SortType} from "@/models/SortType.ts";

const fetchOptions = {
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`
    },
    cache: 'force-cache' as RequestCache
}

export async function getMoviesList(endpoint: string, page: number) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${endpoint}?language=en-US&page=${page}`, fetchOptions).then(res => res.json()) as DataMovieType;
    }
    catch(error){
        console.log(error)
    }
}

export async function getMovieBySearch(query: string) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search/movie?query=${query}`, fetchOptions).then(res => res.json()) as DataMovieType
    }
    catch(error) {
        console.log(error);
    }
}

export async function getGenres(){
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/genre/movie/list?language=en`, fetchOptions).then(res => res.json()).then(data => data.genres) as GenreType[];
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMoviesByGenre(id: number, page: number, sortParams: SortType) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/discover/movie?with_genres=${id}&page=${page}&sort_by=${sortParams?.option}.${sortParams?.direction}`, fetchOptions).then(res => res.json()) as DataMovieType;
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMovieById(id: number) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}`, fetchOptions).then(res => res.json()) as MovieDetailsType;
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMovieImages(id: number) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/images`, fetchOptions).then(res => res.json()).then(data => data.backdrops) as ImageType[];
    }
    catch(error) {
        console.log(error);
    }
}

export async function getMovieVideos(id: number) {
    try{
        return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movie/${id}/videos`, fetchOptions).then(res => res.json()).then(data => data.results) as MovieVideoType[];
    }
    catch(error) {
        console.log(error);
    }
}
