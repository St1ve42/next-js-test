'use client'

import {MouseEventHandler} from "react";
import {useSortMenu} from "@/components/sortMenu/useSortMenu.tsx";
import './SortMenuStyle.css'
import Link from "next/link";

const optionItems = ["All", "Popularity", "Primary release date", "Average vote"]
const directionItems = ["ascending", "descending"]
const optionItemsParams: {[key: string]: string} = {"Popularity": "popularity", "Primary release date": "primary_release_date", "Average vote": "vote_average"}
const directionItemsParams: {[key: string]: string} = {"ascending": "asc", "descending": "desc"}

type PropsType = {
    genreId: number,
    option: string,
    direction: string
}

export const SortMenuComponent = ({genreId, option, direction}: PropsType) => {
    const {isOpenMenu, selectedValue, sortOptionDropdownRef, sortDirectionDropdownRef, handleToggle, handleSelect} = useSortMenu()
    return (
        <div className="w-[400px] flex justify-end gap-3">
            <div className="custom-dropdown-container" ref={sortOptionDropdownRef}>
                <div className="dropdown-header" onClick={handleToggle}>
                    {selectedValue["option"] ? selectedValue["option"] : 'All'}
                </div>

                {isOpenMenu["option"] && (
                    <ul className="dropdown-list">
                        {optionItems.map((item) => (
                            <Link
                                href={{pathname: `/genre/${genreId}`, query: {option: optionItemsParams[item], direction: direction}}}
                                onClick={((event) => handleSelect(event, item)) as MouseEventHandler<HTMLAnchorElement>}
                                key={item}
                            >
                                <li className="dropdown-list-item">
                                    {item}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
            <div className="custom-dropdown-container" ref={sortDirectionDropdownRef}>
                <div className="dropdown-header" onClick={handleToggle}>
                    {selectedValue["direction"] ? selectedValue["direction"] : 'Desc'}
                </div>

                {isOpenMenu["direction"] && (
                    <ul className="dropdown-list">
                        {directionItems.map((item) => (
                            <Link
                                href={{pathname: `/genre/${genreId}`, query: {option: option, direction: directionItemsParams[item]}}}
                                onClick={((event) => handleSelect(event, item)) as MouseEventHandler<HTMLAnchorElement>}
                                key={item}
                            >
                                <li className="dropdown-list-item">
                                    {item}
                                </li>
                            </Link>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};