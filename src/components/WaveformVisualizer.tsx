import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  isPlaying: boolean;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({ audioRef, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    const cleanup = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (sourceRef.current) {
        try {
          sourceRef.current.disconnect();
        } catch (error) {
          // Ignore disconnect errors
        }
        sourceRef.current = null;
      }

      if (analyzerRef.current) {
        try {
          analyzerRef.current.disconnect();
        } catch (error) {
          // Ignore disconnect errors
        }
        analyzerRef.current = null;
      }

      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        try {
          audioContextRef.current.close();
        } catch (error) {
          // Ignore close errors
        }
      }
      audioContextRef.current = null;
      isInitializedRef.current = false;
    };

    // If we don't have the required refs or we're already initialized, skip
    if (!audioRef.current || !canvasRef.current || isInitializedRef.current) {
      return cleanup;
    }

    // Initialize audio context and analyzer
    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyzerRef.current = audioContextRef.current.createAnalyser();
      analyzerRef.current.fftSize = 256;
      sourceRef.current = audioContextRef.current.createMediaElementSource(audioRef.current);
      sourceRef.current.connect(analyzerRef.current);
      analyzerRef.current.connect(audioContextRef.current.destination);
      isInitializedRef.current = true;
    } catch (error) {
      console.error('Error initializing audio context:', error);
      cleanup();
      return;
    }

    const bufferLength = analyzerRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    
    const draw = () => {
      if (!analyzerRef.current || !canvas) return;

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      
      analyzerRef.current.getByteFrequencyData(dataArray);
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      
      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * HEIGHT;
        
        const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
        gradient.addColorStop(0, '#9333ea'); // purple-600
        gradient.addColorStop(1, '#ec4899'); // pink-500
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        
        x += barWidth + 1;
      }
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw);
      }
    };
    
    if (isPlaying) {
      draw();
    }
    
    return cleanup;
  }, [isPlaying, audioRef]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-32 rounded-xl"
      width={1024}
      height={128}
    />
  );
};