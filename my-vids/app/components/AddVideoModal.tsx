'use client'

import { useState, useRef } from 'react'

interface AddVideoModalProps {
  isOpen: boolean
  onClose: () => void
  onAddVideo: (video: { title: string; file: File; thumbnail: string }) => void
}

export default function AddVideoModal({ isOpen, onClose, onAddVideo }: AddVideoModalProps) {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [thumbnail, setThumbnail] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (file && thumbnail) {
      onAddVideo({ 
        title, 
        file, 
        thumbnail: URL.createObjectURL(thumbnail)
      })
      onClose()
      setTitle('')
      setFile(null)
      setThumbnail(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
      if (thumbnailInputRef.current) thumbnailInputRef.current.value = ''
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-950">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-950 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-950">
              Video File
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-1 block w-full"
              required
              accept="video/*"
              ref={fileInputRef}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-950">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
              className="mt-1 block w-full"
              required
              accept="image/*"
              ref={thumbnailInputRef}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Video
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

