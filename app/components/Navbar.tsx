'use client'
import Link from "next/link";
import Logo from '@/public/netflix_logo.svg'
import Image from "next/image";
import { Search } from 'lucide-react';
import { Bell } from 'lucide-react';
import { usePathname } from "next/navigation";
import UserNav from "./UserNav";




interface linkProps {
    name:string,
    href: string
}

const links:linkProps[] = [
    {name:"Home", href:'/home'},
    {name:"Tv Shows", href:'/home/shows'},
    {name:"Movies", href:'/home/movies'},
    {name:"Recently Added", href:'/home/recently'},
    {name:"My List", href:'/home/user/list'},
]

interface iAppProps {
    name:string,
    email:string
    image:any,
}
export default async function Navbar({name,email,image}:iAppProps){

    const pathName = usePathname()

    return(
        <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
            <div className="flex items-center">
                <Link href="/home" className="w-32">
                    <Image priority alt='Netflix Logo' src={Logo} />
                </Link>
                <ul className="lg:flex gap-x-4 ml-14 hidden">
                    {links.map((link,idx) => (
                        <div key={idx}>
                            {pathName === link.href ? (<li className="text-white font-semibold underline text-sm"><Link href={link.href} >{link.name}</Link></li>) : (<li className="text-gray-300 font-normal text-sm"><Link href={link.href}>{link.name}</Link></li>) }
                        </div>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-x-8">
                <Search  className="w-5 h-5 text-grey-300 cursor-pointer"/>
                <Bell className="w-5 h-5 text-grey-300 cursor-pointer"/>
                <UserNav email={email} image={image} name={name}/>
            </div>
        </div>
    )
}