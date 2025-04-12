"use server"
import { revalidatePath } from "next/cache"
import prisma from "./utils/db"
import { getServerSession } from "next-auth";
import { authOptions } from "./utils/options";

export async function addToWatchList(formData: FormData) {
    "use server";
  
    const movieId = formData.get("movieId");
    const pathname = formData.get("pathName") as string;
    const session = await getServerSession(authOptions)

    const data = await prisma.watchList.create({
      data: {
        userId: session?.user?.email as string,
        movieId: Number(movieId),
      },
    });
  
    revalidatePath(pathname);
  }


export async function deleteFromWatchList(FormData:FormData){
    "use server"


    const watchListId = FormData.get("watchListId") as string
    const pathName =  FormData.get("pathName") as string

    const data = await prisma.watchList.delete({
        where:{
            id:watchListId,
        }
    })
    revalidatePath(pathName)
}
export async function sessions(){
    "use server"
    const session = await getServerSession(authOptions)
}