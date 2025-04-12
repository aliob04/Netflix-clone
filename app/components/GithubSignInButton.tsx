"use client"

import { Button } from "@/components/ui/button"
import { RiGithubLine } from "react-icons/ri";
import { signIn } from "next-auth/react";

export default function GithubSignInButton(){
    return(
    <Button onClick={() => signIn('github')} variant="outline" size="icon" >
        <RiGithubLine className="w-4 h-4"/>
    </Button>

    )
}
