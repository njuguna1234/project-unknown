import React from "react";
import { Heart, Trash } from "lucide-react";

const VideoList = ({
  videos,
  onSelectVideo,
  currentVideo,
  onAddToFavorites,
}) => {
  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-100 rounded-md shadow">
      <h3 className="text-lg font-bold mb-4">Videos</h3>
      <ul className="space-y-3">
        {videos.map((video) => (
          <li
            key={video.id}
            className={`p-3 flex justify-between items-center rounded-md ${
              currentVideo?.id === video.id
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-200"
            }`}
            onClick={() => onSelectVideo(video)}
          >
            <span>{video.title}</span>
            <Heart
              className="text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // Prevent video selection
                onAddToFavorites(video);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
