'use client'
import { Button } from '@/components/ui/button'
import { Play, InfoIcon } from 'lucide-react'
import { useState } from 'react'
import PlayVideoModal from './PlayVideoModal'

interface iAppProps {
    title:string;
    overview:string;
    duration:number;
    id:number;
    age:number;
    releaseDate:number;
    youtubeUrl:string;
}

export default function MovieButtons({age,duration,id,overview,releaseDate,title,youtubeUrl}:iAppProps) {
    const [open,setOpen] = useState(false)
    return (
        
        <>
            <Button onClick={() => setOpen(true)} className='text-md font-medium'>
                <Play className='mr-2 h-4 w-4'/> Play
            </Button>
            <Button onClick={() => setOpen(true)} className='text-md font-medium bg-white/40 hover:bg-white/30 text-white'>
                <InfoIcon  className='mr-2 h-4 w-4'/> Learn More
            </Button>
            <PlayVideoModal state={open} changeState={setOpen} age={age} duration={duration} title={title} youtubeUrl={youtubeUrl} overview={overview} release={releaseDate} key={id}/>
        </>
    )
}