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
  release_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const searchContent = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  return response.data.results;
};

export const getTrending = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/trending/all/day?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getPopular = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getNewReleases = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getMoviesByGenre = async (genreId: string, page: number = 1): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&page=${page}&vote_count.gte=100`
  );
  return response.data;
};

export const getTVShows = async (sortBy: string = "popularity.desc", page: number = 1): Promise<MovieResponse> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&sort_by=${sortBy}&page=${page}&vote_count.gte=100&with_original_language=en`
  );
  return response.data;
};

export const getKDramas = async (): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_original_language=ko&sort_by=popularity.desc`
  );
  return response.data.results;
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response = await axios.get<Movie>(
    `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );
  return response.data;
};

export const getTVDetails = async (id: string): Promise<Movie> => {
  const response = await axios.get<Movie>(
    `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}`
  );
  return response.data;
};

export const addToList = async (listId: string, mediaId: number, mediaType: 'movie' | 'tv') => {
  try {
    // Since we don't have actual list functionality implemented yet,
    // we'll simulate a successful addition
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error('Error adding to list:', error);
    throw new Error('Failed to add to list');
  }
};

export const removeFromList = async (listId: string, mediaId: number, mediaType: 'movie' | 'tv') => {
  try {
    // Since we don't have actual list functionality implemented yet,
    // we'll simulate a successful removal
    return Promise.resolve({ success: true });
  } catch (error) {
    console.error('Error removing from list:', error);
    throw new Error('Failed to remove from list');
  }
};

interface Country {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}

export const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(
    `${BASE_URL}/configuration/countries?api_key=${TMDB_API_KEY}`
  );
  return response.data;
};

export const getWatchlistMovies = async (accountId: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/account/${accountId}/watchlist/movies?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getWatchlistTV = async (accountId: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/account/${accountId}/watchlist/tv?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

interface List {
  id: number;
  name: string;
  description: string;
  favorite_count: number;
  item_count: number;
  iso_639_1: string;
  list_type: string;
}

export const getUserLists = async (accountId: string): Promise<List[]> => {
  const response = await axios.get<{ results: List[] }>(
    `${BASE_URL}/account/${accountId}/lists?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getSimilarMovies = async (movieId: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getRecommendations = async (movieId: string): Promise<Movie[]> => {
  const response = await axios.get<MovieResponse>(
    `${BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`
  );
  return response.data.results;
};

export const getImageUrl = (path: string, size: 'w500' | 'original' = 'w500') => {
  return `${IMAGE_BASE_URL}/${size}${path}`;
};
