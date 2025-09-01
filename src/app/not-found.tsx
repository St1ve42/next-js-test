import Link from "next/link";

const PageNotFound404 = () => {
    return (
        <div className="h-[600px] flex  flex-col justify-center items-center">
            <h1>404 - Page Not Found</h1>
            <title>Page Not Found</title>
            <Link href="/">Go Home</Link>
        </div>
    )
}

export default PageNotFound404;