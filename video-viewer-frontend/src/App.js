import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoPlayer from './components/VideoPlayer';
import VideoList from './components/VideoList';
import VideoUpload from './components/VideoUpload';

const BACKEND_URL = 'http://127.0.0.1:5000'

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch videos on mount
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/videos`);
      setVideos(response.data);
      if (response.data.length > 0) {
        setCurrentVideo(response.data[0]);
      }
    } catch (err) {
      setError('Failed to fetch videos. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoUpload = async (newVideo) => {
    const formData = new FormData();
    formData.append('title', newVideo.title);
    formData.append('file', newVideo.file);

    try {
      const response = await axios.post(`${BACKEND_URL}/videos`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setVideos((prev) => [...prev, response.data]);
      setError(null);
    } catch (err) {
      setError('Failed to upload video. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Video Viewer App</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}

      <VideoUpload onUpload={handleVideoUpload} />

      {loading ? (
        <p className="text-center text-blue-500">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {currentVideo && <VideoPlayer video={currentVideo} />}
          </div>
          <VideoList videos={videos} onSelectVideo={setCurrentVideo} currentVideo={currentVideo} />
        </div>
      )}
    </div>
  );
}

export default App;
