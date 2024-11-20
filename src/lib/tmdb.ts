import axios from 'axios';

const TMDB_API_KEY = 'f2415f86b09d4879c84dc8213e9b701b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getTrending = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getPopular = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getNewReleases = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );
  return response.data;
};

export const getTVDetails = async (id: string) => {
  const response = await axios.get(
    `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}`
  );
  return response.data;
};

export const searchContent = async (query: string) => {
  const response = await axios.get(
    `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};