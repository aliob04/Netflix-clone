import Image from "next/image";
import { ReactNode } from "react";

import BackgroundImage from "@/public/login_background.jpg"
import Logo from '@/public/netflix_logo.svg'

export default function AuthLayout({children}:{children:ReactNode}){
    return(
        <div className="relative flex w-screen h-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
            <Image alt="background image" src={BackgroundImage} className="hidden sm:flex sm:object-cover -z-10 brightness-50" priority fill/>
            <Image alt="logo" src={Logo} className="absolute left-4 top-4 object-contain md:left-10 md:top-10" width={120} height={120} priority/>
            {children}
        </div>
    )
}