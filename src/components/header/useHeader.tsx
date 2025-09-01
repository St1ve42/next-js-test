import {type ChangeEventHandler, useEffect, useRef, useState} from "react";
import {GenreType} from "@/models/GenreType.ts";
import {MovieType} from "@/models/MovieType.ts";
import {getGenres, getMovieBySearch} from "@/service/api.service.ts";

export const useHeader = () => {
    const [isVisibleHamburgerMenu, setIsVisibleHamburgerMenu] = useState(false);
    const [isVisibleMobileSearch, setIsVisibleMobileSearch] = useState(false);
    const [genres, setGenres] = useState<GenreType[] | null>(null)
    const [movies, setMovies] = useState<MovieType[] | null>(null)
    const [search, setSearch] = useState<string>('');
    const searchContentRef = useRef<HTMLDivElement>(null)
    const mobileSearchHeaderRef = useRef<HTMLDivElement>(null)
    const mobileSearchContentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        getGenres().then(genres => {
            if(genres){
                setGenres(genres)
            }
        })
        const handleOutsideClick: EventListenerOrEventListenerObject = (event) => {
            if(searchContentRef.current && !searchContentRef.current.contains(event.target as Node)){
                searchContentRef.current.style.display = "none";
            }
            if(mobileSearchHeaderRef.current && !mobileSearchHeaderRef.current.contains(event.target as Node) && mobileSearchContentRef.current && mobileSearchContentRef.current.style.display === "none"){
                mobileSearchHeaderRef.current.style.display = "none";
            }
            if(mobileSearchContentRef.current && !mobileSearchContentRef.current.contains(event.target as Node)){
                mobileSearchContentRef.current.style.display = "none";
            }
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        getMovieBySearch(search).then(moviesData => {
            if(moviesData){
                setMovies(moviesData.results)
            }
        })
    }, [search]);

    const handleSearchedMovie = () => {
        if(searchContentRef.current){
            searchContentRef.current.style.display = "none"
        }
        setSearch('')
        setIsVisibleMobileSearch(false);
    }

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        if(searchContentRef.current && e.target.value === ""){
            searchContentRef.current.style.display = "none"
        }
        else if (mobileSearchContentRef.current && e.target.value === ""){
            mobileSearchContentRef.current.style.display = "none";
        }
        else if (mobileSearchHeaderRef.current && e.target.value === ""){
            mobileSearchHeaderRef.current.style.display = "none";
        }
        else{
            if(searchContentRef.current){
                searchContentRef.current.style.display = "block"
                searchContentRef.current.scrollTop = 0
            }
            if(mobileSearchHeaderRef.current){
                mobileSearchHeaderRef.current.style.display = "block"
                mobileSearchHeaderRef.current.scrollTop = 0
            }
            if(mobileSearchContentRef.current){
                mobileSearchContentRef.current.style.display = "block"
                mobileSearchContentRef.current.scrollTop = 0
            }
        }
        setSearch(e.target.value)
    }

    return {isVisibleHamburgerMenu, isVisibleMobileSearch, setIsVisibleHamburgerMenu, setIsVisibleMobileSearch, genres, movies, search, searchContentRef, mobileSearchHeaderRef,
        mobileSearchContentRef, handleSearchedMovie, handleInputChange}
};