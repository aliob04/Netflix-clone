"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";


interface iAppProps {
    name:string,
    email:string
    image:any,
}
export default async function UserNav({name,email,image}:iAppProps) {

    return(
        <DropdownMenu>

            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-sm ">
                    <Avatar className="h-10 w-10 rounded-sm">
                        <AvatarImage src="https://ltuigoifgjhxloubyhqh.supabase.co/storage/v1/object/public/user%20image/avatar.png"/>
                        <AvatarFallback className="rounded-sm ">{image}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 " align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{email}</p>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={() => signOut()}>
                        Sign out
                    </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    )
}