import React, { useState } from 'react';

const VideoUpload = ({ onUpload }) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && file) {
      onUpload({ title, file });
      setTitle('');
      setFile(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded-md shadow mb-4"
    >
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="title">
          Video Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="file">
          Upload Video
        </label>
        <input
          type="file"
          id="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full p-2 border rounded"
          accept="video/*"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload
      </button>
    </form>
  );
};

export default VideoUpload;
