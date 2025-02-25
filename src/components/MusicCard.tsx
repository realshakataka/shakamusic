import React from 'react';
import { PlayCircle } from 'lucide-react';

interface MusicCardProps {
  title: string;
  genre: string;
  releaseDate: string;
  image: string;
  duration: string;
}

export const MusicCard: React.FC<MusicCardProps> = ({
  title,
  genre,
  releaseDate,
  image,
  duration
}) => {
  return (
    <div className="dark:bg-white/10 bg-black/5 backdrop-blur-lg rounded-xl overflow-hidden group">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <PlayCircle className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-sm dark:text-gray-300 text-gray-600 capitalize">{genre} • {releaseDate}</p>
        <p className="text-sm dark:text-gray-400 text-gray-500">{duration}</p>
      </div>
    </div>
  );
};