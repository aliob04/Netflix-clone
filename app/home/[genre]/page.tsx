import { MovieCard } from "@/app/components/MovieCard"
import prisma from "@/app/utils/db"
import { authOptions } from "@/app/utils/options"
import { getServerSession } from "next-auth"
import Image from "next/image"
async function getData(category:string, userId:string){
    switch(category){
        case "shows":{
            const data = await prisma.movie.findMany({
                where:{
                    category:"show"
                },
                select:{
                    age:true,
                    duration:true,
                    id:true,
                    title:true,
                    release:true,
                    imageString:true,
                    overview:true,
                    youtubeString:true,
                    WathcLists:{
                        where:{
                            userId:userId,
                        }
                    }
                }
            })
            return data
        }case "movies":{
            const data = await prisma.movie.findMany({
                where:{
                    category:"movie"
                },
                select:{
                    age:true,
                    duration:true,
                    title:true,
                    id:true,
                    release:true,
                    imageString:true,
                    overview:true,
                    youtubeString:true,
                    WathcLists:{
                        where:{
                            userId:userId,
                        }
                }
            }
        })
            return data
        }case "recently":{
            const data = await prisma.movie.findMany({
                where:{
                    category:"recent"
                },
                select:{
                    age:true,
                    duration:true,
                    title:true,
                    id:true,
                    release:true,
                    imageString:true,
                    overview:true,
                    youtubeString:true,
                    WathcLists:{
                        where:{
                            userId:userId,
                        }
                }
            }
            })
            return data
        }default:{
            throw new Error()
        }
    }
}

export default async function CategpryPage({params}:{params:{genre:string}}){
    const session = await getServerSession(authOptions)
    const data = await getData(params.genre,session?.user?.email as string)
    return (
        <>
       <h1 className="text-3xl font-bold mt-10">{params.genre}</h1>
       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-5 sm:px-0 mt-7 gap-6">
        {data.map(movie => (
            <div key={movie.id} className="relative h-60">
                <Image src={movie.imageString} alt="Movie Image" width={400} height={500} className="rounded-sm absolute w-full h-full object-cover"/>
                <div className="h-60 relative z-10 w-full transform transition duration-500 hover:scale-125 opacity-0 hover:opacity-100">
                    <div className="bg-gradient-to-b from-transparent via-black/50 to-black z-10 w-full h-full rounded-lg flex items-center justify-center">
                        <Image src={movie.imageString} alt="Movie Image" width={800} height={800} className="absolute h-full w-full object-cover -z-10 rounded-lg"/>
                        <MovieCard age={movie.age} duration={movie.duration} movieId={movie.id} title={movie.title} key={movie.id} overview={movie.overview} watchList={movie.WathcLists.length > 0 ? true:false} year={movie.release} watchListId={movie.WathcLists[0]?.id} youtubeUrl={movie.youtubeString}/>
                    </div>
                </div>
            </div>
        ))}
       </div>
       </>
    )
}