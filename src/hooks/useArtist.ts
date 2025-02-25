import { useQuery } from '@tanstack/react-query';
import { artistData, latestTrack, musicReleases, videos, merchandise, dnaMatches } from '../constants/data';

export const useArtist = (artistId: string) => {
  const { data: artist, isLoading: artistLoading, error: artistError } = useQuery({
    queryKey: ['artist', artistId],
    queryFn: () => Promise.resolve(artistData)
  });

  const { data: track, isLoading: trackLoading } = useQuery({
    queryKey: ['latestTrack', artistId],
    queryFn: () => Promise.resolve(latestTrack),
    enabled: !!artistId
  });

  const { data: releases, isLoading: releasesLoading } = useQuery({
    queryKey: ['releases', artistId],
    queryFn: () => Promise.resolve(musicReleases),
    enabled: !!artistId
  });

  const { data: videoData, isLoading: videosLoading } = useQuery({
    queryKey: ['videos', artistId],
    queryFn: () => Promise.resolve(videos),
    enabled: !!artistId
  });

  const { data: shop, isLoading: merchandiseLoading } = useQuery({
    queryKey: ['merchandise', artistId],
    queryFn: () => Promise.resolve(merchandise),
    enabled: !!artistId
  });

  const { data: matches } = useQuery({
    queryKey: ['dnaMatches', artistId],
    queryFn: () => Promise.resolve(dnaMatches),
    enabled: !!artistId
  });

  const isLoading = artistLoading || trackLoading || releasesLoading || videosLoading || merchandiseLoading;

  return {
    artist,
    latestTrack: track,
    releases,
    freestyles: videoData,
    merchandise: shop,
    dnaMatches: matches,
    isLoading,
    error: artistError
  };
};