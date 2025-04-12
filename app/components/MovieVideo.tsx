import prisma from "../utils/db"
import  { Button } from '@/components/ui/button'
import MovieButtons from "./MovieButtons"
async function getData() {

    const data = await prisma.movie.findFirst({
        select:{
            title:true,
            overview:true,
            videoSource:true,
            imageString:true,
            release:true,
            duration:true,
            id:true,
            age:true,
            youtubeString:true,
        }
    })
    return data
}

export default async function MovieVideo() {

    const data = await getData()
    
    return(
        <div className="h-[55vh] sm:h-[60vh] flex w-full justify-start items-center ">
            <video poster={data?.imageString} autoPlay muted loop src={data?.videoSource} className="w-full absolute left-0 h-[60vh] object-cover -top-4  -z-10 brightness-60"></video>
            <div className="absolute w-[90%] lg:w-[40%] mx-auto">
                <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">{data?.title}</h1>
                <p className="text-white mt-5 line-clamp-3">{data?.overview}</p>
                <div className="flex gap-x-3 mt-4">
                    <MovieButtons id={data?.id as number} age={data?.age as number} duration={data?.duration as number}  overview={data?.overview as string} releaseDate={data?.duration as number} title={data?.title as string} key={data?.id} youtubeUrl={data?.youtubeString as string}/>
                    
                </div>
            </div>
        </div>
    )
}