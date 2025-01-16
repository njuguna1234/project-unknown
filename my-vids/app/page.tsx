'use client'

import { useState } from 'react'
import VideoPlayer from './components/VideoPlayer'
import VideoList from './components/VideoList'
import AddVideoModal from './components/AddVideoModal'

interface Video {
  id: number
  title: string
  url: string
  thumbnail: string
}

const initialVideos: Video[] = [
  { id: 1, title: 'Big Buck Bunny', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 2, title: 'Elephant Dream', url: 'https://test-videos.co.uk/vids/elephantsdream/mp4/h264/720/Elephants_Dream_720_10s_1MB.mp4', thumbnail: '/placeholder.svg?height=120&width=200' },
  { id: 3, title: 'Jellyfish', url: 'https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4', thumbnail: '/placeholder.svg?height=120&width=200' },
]

export default function Home() {
  const [videos, setVideos] = useState<Video[]>(initialVideos)
  const [currentVideo, setCurrentVideo] = useState<Video>(videos[0])
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false)

  const handleAddVideo = (newVideo: { title: string; file: File; thumbnail: string }) => {
    const videoUrl = URL.createObjectURL(newVideo.file)
    const videoWithId: Video = { 
      id: videos.length + 1, 
      title: newVideo.title, 
      url: videoUrl, 
      thumbnail: newVideo.thumbnail 
    }
    setVideos([...videos, videoWithId])
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Video Viewer App</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <VideoPlayer video={currentVideo} />
        </div>
        <div>
          <VideoList 
            videos={videos} 
            onSelectVideo={setCurrentVideo} 
            currentVideo={currentVideo} 
          />
          <button 
            onClick={() => setIsAddVideoModalOpen(true)}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add New Video
          </button>
        </div>
      </div>
      <AddVideoModal 
        isOpen={isAddVideoModalOpen} 
        onClose={() => setIsAddVideoModalOpen(false)} 
        onAddVideo={handleAddVideo} 
      />
    </main>
  )
}

