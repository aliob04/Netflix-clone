import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { authOptions } from "../utils/options";
import Navbar from "../components/Navbar";



export default async function HomeLayout({children}:{children:ReactNode}){

    const session = await getServerSession(authOptions)
    
    if(!session){
        redirect('/login')
    }

    return(
        <>
            <Navbar email={session.user?.email as string} image={session.user?.image} name={session.user?.name as string}/>
            <main className="w-full max-w-7xl mx-auto sm:px-6 lg:px-8">
                {children}
            </main>
        </>
    )
}