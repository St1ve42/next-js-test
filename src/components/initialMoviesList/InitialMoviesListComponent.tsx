import {MovieListCardComponent} from "../movieListCard/MovieListCardComponent.tsx";
import './InitialMoviesListStyle.css'
import {getMoviesList} from "@/service/api.service.ts";
import {DataMovieType} from "@/models/MovieType.ts";
import {SwiperComponent} from "@/components/swiper/SwiperComponent.tsx";
import {MainMoviesListComponent} from "@/components/mainMoviesList/MainMoviesListComponent.tsx";
import {BREAKPOINTS, SLIDES_PER_VIEW} from "@/utils/utils.ts";

type moviesType = {
    [key: string]:  DataMovieType | undefined
}

export const InitialMoviesListComponent = async() => {
    const movies: moviesType = {
        'now_playing': await getMoviesList('now_playing', 1),
        'popular': await getMoviesList('popular', 1),
        'top_rated': await getMoviesList('top_rated', 1),
        'upcoming': await getMoviesList('upcoming', 1),
    }
    return (
        <div className="flex flex-col justify-between mt-5 gap-10 mb-10">
            <section>
                {movies['now_playing'] && <SwiperComponent slides_per_view={1} array={movies['now_playing'].results.map(movie => <MainMoviesListComponent key={movie.id} mainMovie={movie}/>)}/>}
            </section>
            <section>
                <h2 className="initial-movie-title">Now playing</h2>
                {movies['now_playing'] && <SwiperComponent slides_per_view={SLIDES_PER_VIEW} breakpoints={BREAKPOINTS} array={movies['now_playing'].results.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}/>}
            </section>
            <section>
                <h2 className="initial-movie-title">Popular</h2>
                {movies['popular'] && <SwiperComponent slides_per_view={SLIDES_PER_VIEW} breakpoints={BREAKPOINTS} array={movies['popular'].results.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}/>}
            </section>
            <section>
                <h2 className="initial-movie-title">Top rated</h2>
                {movies['top_rated'] && <SwiperComponent slides_per_view={SLIDES_PER_VIEW} breakpoints={BREAKPOINTS} array={movies['top_rated'].results.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}/>}
            </section>
            <section>
                <h2 className="initial-movie-title">Upcoming</h2>
                {movies['upcoming'] && <SwiperComponent slides_per_view={SLIDES_PER_VIEW} breakpoints={BREAKPOINTS} array={movies['upcoming'].results.map(movie => <MovieListCardComponent key={movie.id} movie={movie}/>)}/>}
            </section>
        </div>
    );
};