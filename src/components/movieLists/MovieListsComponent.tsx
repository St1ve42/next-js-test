import {MovieListCardComponent} from "../movieListCard/MovieListCardComponent.tsx";
import './MoviesListStyle.css'
import {PageScrollingComponent} from "../pageScrolling/PageScrollingComponent.tsx";
import {getGenreIdObj} from "@/components/movieLists/utils.ts";
import {getMoviesByGenre} from "@/service/api.service.ts";
import {pageNumerationArray} from "./utils.ts";
import {capitalizeFirstLetter} from "@/utils/utils.ts";

type PropsType = {
    genreId: number,
    page: number
}

export const MovieListsComponent = async({genreId, page}: PropsType) => {
    const genreIdObj = await getGenreIdObj()
    const movies = await getMoviesByGenre(genreId, page)
    const pageNumeration = pageNumerationArray(page - 1)
    return (
        <main className="h-[80%] flex flex-col justify-between mt-5">
            <section>
                <div className="flex justify-between header-movie-list">
                    <h2 className="genreTitle">{genreIdObj && capitalizeFirstLetter(genreIdObj[Number(genreId)])}</h2>
                </div>
                <div className="grid grid-cols-5 movie-list-container gap-3 mt-3 items-center">
                    {movies?.results?.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}
                </div>
            </section>
            <section className="flex justify-evenly mt-10 mb-10">
                {movies && <PageScrollingComponent startPageOfNumeration={page} pageNumeration={pageNumeration} total_pages={movies.total_pages <= 500 ? movies.total_pages : 500} genreId={genreId}/>}
            </section>
        </main>
    );
};

