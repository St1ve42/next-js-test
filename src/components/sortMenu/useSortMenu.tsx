import React, {MouseEventHandler, useEffect, useRef, useState} from "react";

type SortRelatedType<T> = {
    [key: string]: T | null
    option: T | null,
    direction: T | null
}

export const useSortMenu = () => {
    const [isOpenMenu, setIsOpenMenu] = useState<SortRelatedType<boolean>>({option: null, direction: null})
    const [selectedValue, setSelectedValue] = useState<SortRelatedType<string>>({option: null, direction: "descending"})
    const [sortOptionDropdownRef, sortDirectionDropdownRef] = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)]

    useEffect(() => {
        const handleOutsideClick: EventListenerOrEventListenerObject = (event) => {
            if (sortOptionDropdownRef.current && !sortOptionDropdownRef.current.contains(event.target as Node)){
                setIsOpenMenu(prevState => {
                    return {...prevState, option: false}
                })
            }
            if(sortDirectionDropdownRef.current && !sortDirectionDropdownRef.current.contains(event.target as Node)){
                setIsOpenMenu(prevState => {
                    return {...prevState, direction: false}
                })
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleToggle: MouseEventHandler = (event) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target as Node)){
            setIsOpenMenu(prevState => {
                return {...prevState, option: true}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target as Node)){
            setIsOpenMenu(prevState => {
                return {...prevState, direction: true}
            })
        }
    };

    const handleSelect: (event: React.MouseEvent<HTMLAnchorElement>, value: string) => void = (event, value) => {
        if (sortOptionDropdownRef.current && sortOptionDropdownRef.current.contains(event.target as Node)){
            setSelectedValue(prevState => {
                return {...prevState, option: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, option: false}
            })
        }
        else if(sortDirectionDropdownRef.current && sortDirectionDropdownRef.current.contains(event.target as Node)){
            setSelectedValue(prevState => {
                return {...prevState, direction: value}
            })
            setIsOpenMenu(prevState => {
                return {...prevState, direction: false}
            })
        }
    };
    return {isOpenMenu, selectedValue, sortOptionDropdownRef, sortDirectionDropdownRef, handleToggle, handleSelect}
};