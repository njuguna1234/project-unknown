import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ video }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{video.title}</h2>
      <ReactPlayer url={`http://127.0.0.1:5000${video.url}`} controls width="100%" />
    </div>
  );
};

export default VideoPlayer;
