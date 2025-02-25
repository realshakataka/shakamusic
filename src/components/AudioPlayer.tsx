import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  currentTrack: {
    title: string;
    artist: string;
  } | null;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onPlayPause,
  currentTrack,
  audioRef
}) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-lg text-white 
      transform transition-transform duration-300 ${currentTrack ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onPlayPause}
            className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          {currentTrack && (
            <div>
              <p className="font-medium">{currentTrack.title}</p>
              <p className="text-sm text-gray-400">{currentTrack.artist}</p>
            </div>
          )}
        </div>
        <button
          onClick={toggleMute}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}