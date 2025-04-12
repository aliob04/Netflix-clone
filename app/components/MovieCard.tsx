'use client'
import { Heart, Play} from "lucide-react";
import { Button } from "@/components/ui/button";
import PlayVideoModal from "./PlayVideoModal";
import { useState } from "react";
import { addToWatchList, deleteFromWatchList } from "../action";
import { usePathname } from "next/navigation";

import { FaHeart } from "react-icons/fa";

interface iAppProps{
    title:string;
    overview:string;
    movieId:number;
    watchList:boolean;
    watchListId:string;
    youtubeUrl:string;
    year:number;
    age:number;
    duration:number
}
export function MovieCard({title,overview,movieId,watchList,watchListId,youtubeUrl,year,age,duration}:iAppProps) {
    const [open,setOpen] = useState(false)
    const pathname = usePathname()

    return (
            <>
            <button onClick={() => setOpen(true)}>
                <Play className="h-10 w-14"/>
            </button>

            <div className="absolute right-5 top-5 z-10">
                {watchList ? 
                (<form action={deleteFromWatchList}>
                    <input type="hidden" name="watchListId" value={watchListId} />
                    <input type="hidden" name="movieId" value={movieId}/>
                    <input type="hidden" name="pathName" value={pathname}/>
                    <Button variant="outline" size="icon" className="rounded-3xl">
                    <FaHeart className="h-4 w-4 text-red-500"/>
                    </Button>
                </form>)
                :
                (<form action={addToWatchList}>
                    <input type="hidden" name="movieId" value={movieId}/>
                    <input type="hidden" name="pathName" value={pathname}/>
                    <Button variant="outline" size="icon" className="rounded-3xl" >
                        <Heart className="h-4 w-4"/>
                    </Button>
                </form>)}
            </div>
            <div className="p-5 absolute bottom-0 left-0">
                <h1 className="font-bold text-md line-clamp-1">{title}</h1>
                className="flex gap-x-2 items-center">
                    <p className="font-normal text-sm">{year}</p>
                    <p className="font-normal border py-0.5 px-1 border-gray-200 rounded text-sm text-center">{age}+</p>
                    <p className="font-normal text-sm">{duration}h</p>
                <div/>
                <p className="line-clamp-1 text-sm text-gray-200 font-light">
                    {overview}
                </p>
            </div>
            <PlayVideoModal title={title} overview={overview} youtubeUrl={youtubeUrl} key={movieId} state={open} changeState={setOpen} age={age} duration={duration} release={year}/>
            </>
    )
}