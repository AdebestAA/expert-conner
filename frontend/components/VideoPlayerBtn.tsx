"use client"
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const VideoPlayerBtn = () => {
    const router = useRouter()
  return (
   <>
   <div className="py-4 flex justify-end">
      <Button 
      onClick={()=>{
      router.push("https://tally.so/r/mROxAQ")
      }}
      >Next</Button>
      </div>
   </>
  )
}

export default VideoPlayerBtn