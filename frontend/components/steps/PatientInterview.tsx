'use client'

import React, { FC, useMemo, useState } from 'react'
import VideoSelectButton from '../custom/VideoSelectButton'
import { useCaseContext } from '@/lib/context/caseContext'
import { RenderHTML } from '@/components/RenderHTML'
import ReactPlayer from 'react-player'
import { Title } from '@/components/Title'

interface Props {
}


const PatientInterview: FC<Props> = () => {
  const [selectedVideo, setSelectedVideo] = useState(0)
  const [videoPlaying, setVideoPlaying] = useState(false);

  const { medicalCase } = useCaseContext()

  const videoToShow = useMemo(() => {
    return medicalCase?.videoUrl[selectedVideo]
  }, [selectedVideo, medicalCase?.videoUrl])

  const handleVideoSelect = (index: number) => {
    setSelectedVideo(index);
    setVideoPlaying(true);
  };

  if (!videoToShow) {
    return <p>There is no video to be displayed.</p>
  }

  return (
    <div className="relative">
      {/* Video Select Buttons */}
      <div
        className={`flex flex-col gap-4 max-w-sm absolute inset-0 z-10 top-0 m-auto transition-opacity duration-300 mb-[80px] mt-[80px] ${
          videoPlaying ? 'opacity-0' : 'opacity-100'
        } justify-center`}
      >
        {medicalCase?.videoUrl.map((video, index) => {
          return (
            <VideoSelectButton
              key={index}
              title={video.videoTitle}
              onClick={() => handleVideoSelect(index)}
            />
          )
        })}
      </div>

      {/* Video Display */}
      <div className="h-[450px] bg-gray-200 mb-6 rounded-lg relative">
        <VideoDisplay
          url={videoToShow.url}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          autoPlay={videoPlaying}
        />
      </div>

      {/* Transcript TODO: removed from design? */}
      {/*<p className="font-semibold text-sei-standard uppercase mb-3">Interview Transcript</p>*/}
      {/*<div className="text-gray-600 text-sm flex flex-col gap-2 richtext">*/}
      {/*  <RenderHTML htmlString={videoToShow.transcript.html} />*/}
      {/*</div>*/}
    </div>
  )
}

/*
* Needs the key to dynamically change when clicking the buttons
*
* */

type VideoDisplayProps = {
  url: string
  autoPlay: boolean
  onPlay: () => void
  onPause: () => void
}

const VideoDisplay = ({ url, autoPlay, onPlay, onPause }: VideoDisplayProps) => {
  return (
    <div className="h-full w-full">
      <ReactPlayer
        url={url}
        playing={autoPlay}
        onPlay={onPlay}
        onPause={onPause}
        controls
        width="100%"
        height="100%"
        config={{ file: { attributes: { controlsList: 'nodownload' } } }}
      />
    </div>
  )
}
export default PatientInterview
