import type {FC} from "react";
import Link from "next/link";

type PropsType = {
    startPageOfNumeration: number,
    pageNumeration: number[],
    total_pages: number,
    genreId: number,
}

export const PageScrollingComponent: FC<PropsType> = ({startPageOfNumeration, pageNumeration, total_pages, genreId}) => {
    if(startPageOfNumeration <= 2){
            return (<div className="flex justify-center gap-5">
                {pageNumeration.map(value => {
                    return (
                        <Link href={{pathname: `/genre/${genreId}`, query: {page: value.toString()}}} key={value}>{value}</Link>
                    )
                })}
                <p>...</p>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: total_pages.toString()}}}>{total_pages}</Link>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: startPageOfNumeration <= total_pages - 3 ? startPageOfNumeration + 1 : startPageOfNumeration}}}>&gt;</Link>
            </div>)
        }
    else if(startPageOfNumeration >= 3 && startPageOfNumeration <= total_pages - 2){
            return (<div className="flex justify-center gap-5">
                <Link href={{pathname: `/genre/${genreId}`, query: {page: startPageOfNumeration > 1 ? startPageOfNumeration - 1 : startPageOfNumeration}}}>&lt;</Link>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: 1}}}>1</Link>
                <p>...</p>
                {pageNumeration.map(value => {
                    return (
                        <Link href={{pathname: `/genre/${genreId}`, query: {page: value.toString()}}} key={value}>{value}</Link>
                    )
                })}
                <p>...</p>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: total_pages.toString()}}}>{total_pages}</Link>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: startPageOfNumeration <= total_pages - 3 ? startPageOfNumeration + 1 : startPageOfNumeration}}}>&gt;</Link>
            </div>)
        }
    return (<div className="flex justify-center gap-5">
                <Link href={{pathname: `/genre/${genreId}`, query: {page: startPageOfNumeration > 1 ? startPageOfNumeration - 1 : startPageOfNumeration}}}>&lt;</Link>
                <Link href={{pathname: `/genre/${genreId}`, query: {page: 1}}}>1</Link>
                <p>...</p>
                {pageNumeration.map(value => {
                    return (
                        <Link href={{pathname: `/genre/${genreId}`, query: {page: value.toString()}}} key={value}>{value}</Link>
                    )
                })}
        </div>)
};