import React from 'react';

const VideoList = ({ videos, onSelectVideo, currentVideo }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Videos</h3>
      <ul className="space-y-2">
        {videos.map((video) => (
          <li
            key={video.id}
            className={`p-2 cursor-pointer ${currentVideo?.id === video.id ? 'bg-blue-200' : 'bg-gray-100'} rounded`}
            onClick={() => onSelectVideo(video)}
          >
            {video.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VideoList;
