import { MovieCard } from "@/app/components/MovieCard"
import prisma from "@/app/utils/db"
import { authOptions } from "@/app/utils/options"
import { getServerSession } from "next-auth"
import Image from "next/image"

async function getData(userId:string) {
    const data = await prisma.watchList.findMany({
        select:{
            Movie:{
                select:{
                    title:true,
                    age:true,
                    duration:true,
                    imageString:true,
                    overview:true,
                    release:true,
                    id:true,
                    WathcLists:true,
                    youtubeString:true
                }
            }
        },
        where:{
            userId: userId,
            //where the user ID of the watch list matches our user ID
        }
    })
    return data
}

export default async function WatchList(){

    const session = await getServerSession(authOptions)
    const data = await getData(session?.user?.email as string)

    return(
        <>
        <h1 className="text-white text-4xl font-bold mt-10 px-5 sm:px-0">Your WatchList</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-7 gap-6">
         {data.map(movie => (
             <div key={movie.Movie?.id} className="relative h-60">
                 <Image src={movie.Movie?.imageString as string} alt="Movie Image" width={400} height={500} className="rounded-sm absolute w-full h-full object-cover"/>
                 <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                     <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                         <Image src={movie.Movie?.imageString as string} alt="Movie Image" width={800} height={800} className="absolute h-full w-full object-cover -z-10 rounded-lg"/>
                         <MovieCard age={movie.Movie?.age as number} duration={movie.Movie?.duration as number} movieId={movie.Movie?.id as number} title={movie.Movie?.title as string} key={movie.Movie?.id} overview={movie.Movie?.overview as string} watchList={movie.Movie?.WathcLists.length as number > 0 ? true:false } year={movie.Movie?.release as number} watchListId={movie.Movie?.WathcLists[0]?.id as string} youtubeUrl={movie.Movie?.youtubeString as string}/>
                     </div>
                 </div>
             </div>
         ))}
        </div>
        </>
    )
}