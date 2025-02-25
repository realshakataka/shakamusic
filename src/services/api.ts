import axios from 'axios';

const API_URL = 'https://api.example.com/v1'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface Artist {
  id: string;
  name: string;
  image: string;
  role: string;
  location: string;
  genre: string;
  stats: {
    monthlyListeners: string;
    trending: string;
    topMarkets: string[];
  };
  social: {
    instagram: string;
    twitter: string;
    youtube: string;
    spotify: string;
    tiktok: string;
  };
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
}

export interface Release {
  id: string;
  title: string;
  genre: string;
  releaseDate: string;
  image: string;
  duration: string;
}

export interface Freestyle {
  id: string;
  title: string;
  duration: string;
  views: string;
  image: string;
}

export interface Merchandise {
  id: string;
  name: string;
  price: string;
  image: string;
}

export const artistApi = {
  getArtist: async (id: string): Promise<Artist> => {
    const response = await api.get(`/artists/${id}`);
    return response.data;
  },

  getLatestTrack: async (artistId: string): Promise<Track> => {
    const response = await api.get(`/artists/${artistId}/latest-track`);
    return response.data;
  },

  getReleases: async (artistId: string): Promise<Release[]> => {
    const response = await api.get(`/artists/${artistId}/releases`);
    return response.data;
  },

  getFreestyles: async (artistId: string): Promise<Freestyle[]> => {
    const response = await api.get(`/artists/${artistId}/freestyles`);
    return response.data;
  },

  getMerchandise: async (artistId: string): Promise<Merchandise[]> => {
    const response = await api.get(`/artists/${artistId}/merchandise`);
    return response.data;
  },
};