import React from 'react';
import { Play, Filter, Clock, Eye, Calendar } from 'lucide-react';
import { SectionTitle } from '../components/SectionTitle';
import { VideoCard } from '../components/VideoCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useArtist } from '../hooks/useArtist';
import { containerStyles, buttonStyles } from '../styles/common';
import { videoCategories } from '../constants/data';

export const Videos: React.FC = () => {
  const [filter, setFilter] = React.useState('all');
  const { freestyles: videos, isLoading, error } = useArtist('default');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load videos" />;

  const filteredVideos = filter === 'all'
    ? videos
    : videos?.filter(video => video.type === filter);

  return (
    <div className={containerStyles.content}>
      <SectionTitle icon={Play} title="VIDEOS" />
      
      <div className="flex flex-wrap gap-4 mb-8">
        {videoCategories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`${
              filter === category.id
                ? buttonStyles.primary
                : buttonStyles.secondary
            } px-4 py-2 rounded-full flex items-center gap-2`}
          >
            <Filter className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos?.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
};