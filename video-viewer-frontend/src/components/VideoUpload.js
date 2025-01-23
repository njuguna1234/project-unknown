import React, { useState } from 'react';

const VideoUpload = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !file) {
      setError('Please provide a title and a video file.');
      return;
    }
    onUpload({ title, file });
    setTitle('');
    setFile(null);
    setError(null);
  };

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Upload a Video</h3>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2">
        <div>
          <input
            type="text"
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="border p-2 rounded w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>
    </div>
  );
};

export default VideoUpload;
