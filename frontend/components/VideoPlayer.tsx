"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerProps {
  url: string;
  className?: string;
  aspectRatio?: string; 
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  className = "",
  aspectRatio = "16/9",
}) => {


    const [isMounted,setIsMounted] = useState<boolean>(false)

    useEffect(()=>{
setIsMounted(true)
    },[])
  return (
    <div
      className={`relative w-full max-h-[80vh] overflow-hidden rounded-2xl ${className}`}
      style={{ aspectRatio }}
    >
     {isMounted && <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        // style={{ position: "absolute", top: 0, left: 0 }}
        controls
        light={false}
        pip={true}
        config={{
          vimeo: {
            playerOptions: {
              responsive: true,
            },
          },
        }}
      />}
    </div>
  );
};

export default VideoPlayer;
