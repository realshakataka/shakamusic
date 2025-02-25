import React, { useState, useRef } from 'react';
import { 
  Disc, 
  Radio, 
  Star, 
  Heart, 
  Mic2, 
  Globe2, 
  PlayCircle, 
  Share2, 
  Headphones, 
  TrendingUp, 
  Award, 
  AudioWaveform as Waveform
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { MusicCard } from '../components/MusicCard';
import { GenreFilter } from '../components/GenreFilter';
import { SectionTitle } from '../components/SectionTitle';
import { Card } from '../components/Card';
import { SocialLinks } from '../components/SocialLinks';
import { AudioPlayer } from '../components/AudioPlayer';
import { WaveformVisualizer } from '../components/WaveformVisualizer';
import { ShareModal } from '../components/ShareModal';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useArtist } from '../hooks/useArtist';
import { containerStyles, buttonStyles } from '../styles/common';

export const Home: React.FC = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [activeGenre, setActiveGenre] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const {
    artist,
    latestTrack,
    releases,
    dnaMatches,
    isLoading,
    error
  } = useArtist('default');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load artist data" />;
  if (!artist) return null;

  const handlePlayLatest = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const filteredReleases = activeGenre === 'all' 
    ? releases 
    : releases?.filter(release => release.genre === activeGenre);

  return (
    <div className={containerStyles.content}>
      <div className="flex flex-col lg:flex-row items-center gap-8 mb-12 md:mb-16">
        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 group">
          <img
            src={artist.image}
            alt={artist.name}
            className="rounded-full object-cover w-full h-full border-4 
              dark:border-purple-500 border-purple-400
              shadow-lg dark:shadow-purple-500/50 shadow-purple-300/50 
              transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute -bottom-4 right-4 bg-purple-600 rounded-full p-3 shadow-lg">
            <Star className="w-8 h-8 text-yellow-300" />
          </div>
          <button 
            className="absolute top-4 right-4 
              dark:bg-white/10 bg-black/10 
              backdrop-blur-sm p-2 rounded-full 
              dark:hover:bg-white/20 hover:bg-black/20 
              transition-colors"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'dark:text-white text-gray-900'}`} />
          </button>
        </div>
        
        <div className="md:ml-8 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <Mic2 className="w-6 h-6 text-purple-500" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              {artist.name}
            </h1>
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-2 mb-3">
            <Globe2 className="w-5 h-5 text-blue-500" />
            <span className="text-lg text-blue-500">{artist.location}</span>
          </div>
          <p className="text-xl dark:text-gray-300 text-gray-600 mb-4">{artist.genre}</p>
          
          <div className="flex justify-center lg:justify-start mb-6">
            <SocialLinks social={artist.social} />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="dark:bg-white/10 bg-black/5 backdrop-blur-sm rounded-xl p-4">
              <Headphones className="w-5 h-5 text-purple-500 mb-2" />
              <p className="text-sm dark:text-gray-300 text-gray-600">Monthly Listeners</p>
              <p className="text-xl font-bold">{artist.stats.monthlyListeners}</p>
            </div>
            <div className="dark:bg-white/10 bg-black/5 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="w-5 h-5 text-green-500 mb-2" />
              <p className="text-sm dark:text-gray-300 text-gray-600">Growth</p>
              <p className="text-xl font-bold text-green-500">{artist.stats.trending}</p>
            </div>
            <div className="dark:bg-white/10 bg-black/5 backdrop-blur-sm rounded-xl p-4 col-span-2 md:col-span-1">
              <Award className="w-5 h-5 text-yellow-500 mb-2" />
              <p className="text-sm dark:text-gray-300 text-gray-600">Top Markets</p>
              <p className="text-lg font-medium">{artist.stats.topMarkets.join(", ")}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <button 
              onClick={handlePlayLatest}
              className={`${buttonStyles.primary} px-4 py-2 rounded-full flex items-center gap-2`}
            >
              <PlayCircle className="w-5 h-5" />
              <span className="font-semibold">{isPlaying ? 'Pause' : 'Play Latest'}</span>
            </button>
            <button 
              onClick={handleShare}
              className={`${buttonStyles.secondary} px-4 py-2 rounded-full flex items-center gap-2`}
            >
              <Share2 className="w-5 h-5" />
              <span className="font-semibold">Share Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* <section id="music" className={containerStyles.section}>
        <SectionTitle icon={Disc} title="LATEST RELEASES" />
        <GenreFilter activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredReleases?.map((release, index) => (
            <MusicCard key={index} {...release} />
          ))}
        </div>
      </section> */}

      {/* <section className={containerStyles.section}>
        <div className="flex justify-center mb-8">
          <div className="dark:bg-white/10 bg-black/5 backdrop-blur-sm rounded-full p-1">
            <button
              className={`px-6 py-2 rounded-full transition-colors ${
                activeGenre === 'matches' 
                  ? 'bg-purple-600 text-white' 
                  : 'dark:hover:bg-white/10 hover:bg-black/10'
              }`}
            >
              Musical DNA Matches
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dnaMatches?.map((artist, index) => (
            <Card key={index} className="p-6 hover:bg-white/15 cursor-pointer group">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-purple-600 rounded-full p-1">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{artist.name}</h3>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-24 dark:bg-purple-900 bg-purple-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500 ease-out"
                        style={{ width: artist.matchScore }}
                      ></div>
                    </div>
                    <span className="text-sm text-purple-500">{artist.matchScore}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm dark:text-gray-300 text-gray-600">
                <p>{artist.trait}</p>
                <p>Top Song: {artist.topSong}</p>
                <p>{artist.streams} monthly streams</p>
              </div>
            </Card>
          ))}
        </div>
      </section> */}

      <audio
        ref={audioRef}
        src={latestTrack?.audioUrl}
        onEnded={() => setIsPlaying(false)}
      />

      <AudioPlayer
        isPlaying={isPlaying}
        onPlayPause={handlePlayLatest}
        currentTrack={latestTrack}
        audioRef={audioRef}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={window.location.href}
        artistName={artist.name}
      />
    </div>
  );
};