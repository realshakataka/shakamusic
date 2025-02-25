import React from 'react';
import { genres } from '../constants/data';

interface GenreFilterProps {
  activeGenre: string;
  setActiveGenre: (genre: string) => void;
}

export const GenreFilter: React.FC<GenreFilterProps> = ({
  activeGenre,
  setActiveGenre
}) => {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {genres.map(genre => (
        <button
          key={genre.id}
          onClick={() => setActiveGenre(genre.id)}
          className={`px-4 py-2 rounded-full transition-colors ${
            activeGenre === genre.id
              ? 'bg-purple-600 text-white'
              : 'dark:bg-white/10 bg-black/5 dark:hover:bg-white/20 hover:bg-black/10'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
};