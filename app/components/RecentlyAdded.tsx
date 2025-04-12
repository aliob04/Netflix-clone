import prisma from "../utils/db"
import Image from "next/image"
import { MovieCard } from "./MovieCard"
import { getServerSession } from "next-auth"
import { authOptions } from "../utils/options"
async function getData(userId:string) {
    const data = await prisma.movie.findMany({
        select:{
            id:true,
            title:true,
            overview:true,
            WathcLists:{
                where:{
                    userId:userId
                }
            },
            imageString:true,
            youtubeString:true,
            age:true,
            release:true,
            duration:true
        },
        orderBy:{
            createdAt:"desc"
        },
        take:4
    })
    return data
}

export default async function RecentlyAdded() {
    const session = await getServerSession(authOptions)
    const data = await getData(session?.user?.email as string)
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-6">
            {data.map((movie) => (
                <div key={movie.id} className="relative h-48">
                    <Image src={movie.imageString} alt="Movie" className="rounded-sm absolute w-full h-full object-cover" width={400} height={500}/>
                    <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                        <div className="bg-gradient-to-b from-transparent via-black/50 to-black w-full h-full z-10 rounded-lg flex items-center justify-center">
                            <Image src={movie.imageString} alt="Movie" width={800} height={800} className="absolute rounded-lg w-full h-full -z-10 object-cover"/>
                            <MovieCard age={movie.age} duration={movie.duration} year={movie.release} movieId={movie.id} overview={movie.overview} title={movie.title} youtubeUrl={movie.youtubeString} watchListId={movie.WathcLists[0]?.id} watchList={movie.WathcLists.length > 0 ? true:false} key={movie.id}/>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>
    )
}