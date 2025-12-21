import { redirect } from "next/navigation"
import { Suspense } from "react"
import {Results} from "./_components/results"

export default function SearchPage(
    {searchParams} : {searchParams :{term?: string}}
) {
    if(!searchParams.term) return redirect("/")
    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense>
                <Results term={searchParams.term}/>
            </Suspense>
        </div>
    )
}