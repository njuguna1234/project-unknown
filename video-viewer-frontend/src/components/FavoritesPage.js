import React from "react";
import { Trash } from "lucide-react";

const FavoritesPage = ({ favorites, onRemoveFromFavorites }) => {
  return (
    <div className="p-4 bg-gray-200 rounded-md shadow mt-6">
      <h3 className="text-lg font-bold mb-4">Favorites</h3>
      <ul className="space-y-3">
        {favorites.map((video) => (
          <li
            key={video.id}
            className="p-3 flex justify-between items-center bg-white rounded-md hover:bg-gray-100"
          >
            <span>{video.title}</span>
            <Trash
              className="text-red-500 cursor-pointer"
              onClick={() => onRemoveFromFavorites(video.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesPage;
