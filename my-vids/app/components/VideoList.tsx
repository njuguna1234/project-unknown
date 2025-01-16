import Image from 'next/image'

interface Video {
  id: number
  title: string
  url: string
  thumbnail: string
}

interface VideoListProps {
  videos: Video[]
  onSelectVideo: (video: Video) => void
  currentVideo: Video
}

export default function VideoList({ videos, onSelectVideo, currentVideo }: VideoListProps) {
  return (
    <div className="bg-gray-950  rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Video List</h2>
      {videos.length === 0 ? (
        <p className="text-gray-950">No videos available. Add some videos to get started!</p>
      ) : (
        <ul className="space-y-4">
          {videos.map((video) => (
            <li
              key={video.id}
              className={`cursor-pointer ${
                video.id === currentVideo.id ? 'bg-blue-100' : 'hover:bg-gray- 900'
              } rounded-lg p-2 transition duration-200`}
              onClick={() => onSelectVideo(video)}
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={`${video.title} thumbnail`}
                  width={80}
                  height={60}
                  className="rounded object-cover"
                />
                <span className="font-medium">{video.title}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

