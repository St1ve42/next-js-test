import {PosterPreviewComponent} from "../posterPreview/PosterPreviewComponent.tsx";
import './MovieInfoStyle.css'
import {StarsRatingComponent} from "../starsRating/StarsRatingComponent.tsx";
import {GenreBadgeComponent} from "../genreBadge/GenreBadgeComponent.tsx"
import {Progress} from "../progressBar/ProgressBarComponent.tsx";
import {BREAKPOINTS, COLOR_GENRES, getDate, SLIDES_PER_VIEW} from "@/utils/utils.ts";
import {STUB} from "@/utils/utils.ts";
import {getMovieById, getMovieImages, getMovieVideos} from "@/service/api.service.ts";
import Image from "next/image";
import {SwiperComponent} from "@/components/swiper/SwiperComponent.tsx";
import {ImageNotFoundComponent} from "@/components/imageNotFound/ImageNotFoundComponent.tsx";

type PropsType = {
    movieId: number
}

export const MovieInfoComponent = async({movieId}: PropsType) => {
    const movie = await getMovieById(movieId)
    const movieImages = await getMovieImages(movieId)
    const movieVideos = await getMovieVideos(movieId)
    return (
        <main className="w-full">
            <section>
                <div className="mt-2 mb-4 flex gap-3 max-[946px]:flex-col max-[946px]:items-center">
                    <div className="mt-2">
                        {movie?.poster_path ? <PosterPreviewComponent movie={movie}/> : <ImageNotFoundComponent/>}
                    </div>
                    <aside className="pl-5 ml-10 max-[946px]:self-center">
                        <div className="flex gap-5 max-[946px]:flex-col max-[946px]:mb-5">
                            <h1 className="title mt-2">{movie ? movie.title : STUB}</h1>
                            <Progress strokeWidth={9} percentage={+(movie?.vote_average ? movie.vote_average.toPrecision(2) : 0) * 10}/>
                        </div>
                        <ul className="flex flex-col gap-5 ml-[2px] mb-6">
                            <li>{movie?.runtime ? movie.runtime : STUB} min</li>
                            <li>Original title: &quot;{movie?.original_title ? movie.original_title : STUB}&quot;</li>
                            <li>Release date: {movie?.release_date ? getDate(movie.release_date.toString()) : STUB}</li>
                            <li>Genres: {movie?.genres.length !== 0 ? movie?.genres.map((genre, index) => <GenreBadgeComponent key={index} bgColor={COLOR_GENRES[genre.name][0]} textColor={COLOR_GENRES[genre.name][1]}>{genre.name}</GenreBadgeComponent>) : STUB}</li>
                            <li>Country: {movie?.origin_country.length !== 0 ? movie?.origin_country.map((country, index) => <span key={index} className="ml-1">{country}{index !== movie?.origin_country.length - 1 ? ',' : ''}</span>) : STUB}</li>
                            <li>Production company: {movie?.production_companies.length !== 0 ? movie?.production_companies.map((company, index) => <span key={index} className="ml-1">{company.name}{index !== movie?.production_companies.length - 1 ? ',' : ''}</span>) : STUB}</li>
                        </ul>
                        <StarsRatingComponent/>
                    </aside>
                </div>
                <div className="flex flex-col">
                    <p>Description: <br/>{movie?.overview ? movie?.overview : STUB}</p>
                </div>
            </section>
            <section className="mt-7 mb-7">
                {movieImages && <SwiperComponent array={movieImages?.slice(0, 8).map((image, index) => <Image key={index} width={250} height={250} className="h-auto w-auto" src={`https://image.tmdb.org/t/p/original${image.file_path}`} alt={image.file_path}/>)} slides_per_view={SLIDES_PER_VIEW} breakpoints={BREAKPOINTS}/>}
            </section>
            {movieVideos && movieVideos.length!==0 && <iframe className="mb-10 max-[897px]:h-[320px]" width="100%" height="561" src={`https://www.youtube.com/embed/${movieVideos[0].key}`} title={`${movieVideos[0].name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen>
            </iframe>}
        </main>
    );
};
