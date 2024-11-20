import axios from 'axios';

const TMDB_API_KEY = 'f2415f86b09d4879c84dc8213e9b701b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  media_type?: string;
}

export const getTrending = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getPopular = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getNewReleases = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getHorrorMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=27&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getSciFiMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=878&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getAnimatedMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=16&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getThrillerMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=53&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getRomanceMovies = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=10749&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getMoviesByGenre = async (genreId: string): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getTVShows = async (sortBy: string = "popularity.desc"): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&sort_by=${sortBy}&with_original_language=en`
  );
  return response.data.results;
};

export const getKDramas = async (): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=ko&sort_by=popularity.desc`
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

export const searchContent = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};