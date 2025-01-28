import React from 'react';

const VideoPlayer = ({ video }) => {
  return (
    <div className="bg-black p-4 rounded-md shadow">
      <h2 className="text-white text-xl font-bold mb-2">{video.title}</h2>
      <video
        controls
        src={`http://127.0.0.1:5000${video.url}`}
        className="w-full h-64"
      />
    </div>
  );
};

export default VideoPlayer;
