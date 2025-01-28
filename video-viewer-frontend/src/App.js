import React, { useState, useEffect } from "react";
import axios from "axios";
import VideoPlayer from "./components/VideoPlayer";
import VideoList from "./components/VideoList";
import VideoUpload from "./components/VideoUpload";
import FavoritesPage from "./components/FavoritesPage";

const BACKEND_URL = "http://127.0.0.1:5000";

function App() {
  const [videos, setVideos] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch videos on mount
  useEffect(() => {
    fetchVideos();
    fetchFavorites();
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
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/favorites`);
      setFavorites(response.data);
    } catch (err) {
      setError("Failed to fetch favorites.");
    }
  };

  const handleAddToFavorites = async (video) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/favorites`, {
        video_id: video.id,
      });
      setFavorites((prev) => [...prev, video]);
      alert("Video added to favorites!");
    } catch (err) {
      setError("Failed to add video to favorites.");
    }
  };

  const handleRemoveFromFavorites = async (videoId) => {
    try {
      await axios.delete(`${BACKEND_URL}/favorites/${videoId}`);
      setFavorites((prev) => prev.filter((fav) => fav.id !== videoId));
      alert("Video removed from favorites.");
    } catch (err) {
      setError("Failed to remove video from favorites.");
    }
  };

  return (
    <div className="App container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Video Viewer App</h1>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
        </div>
      )}

      <VideoUpload onUpload={fetchVideos} />

      {loading ? (
        <p className="text-center text-blue-500">Loading videos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            {currentVideo && <VideoPlayer video={currentVideo} />}
          </div>
          <VideoList
            videos={videos}
            onSelectVideo={setCurrentVideo}
            currentVideo={currentVideo}
            onAddToFavorites={handleAddToFavorites}
          />
        </div>
      )}

      {/* Favorites Page */}
      <FavoritesPage
        favorites={favorites}
        onRemoveFromFavorites={handleRemoveFromFavorites}
      />
    </div>
  );
}

export default App;
