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
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

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

export const addToList = async (listId: string, mediaId: number, mediaType: 'movie' | 'tv') => {
  const response = await axios.post(
    `${BASE_URL}/list/${listId}/add_item?api_key=${TMDB_API_KEY}`,
    {
      media_id: mediaId,
      media_type: mediaType
    }
  );
  return response.data;
};

export const removeFromList = async (listId: string, mediaId: number, mediaType: 'movie' | 'tv') => {
  const response = await axios.post(
    `${BASE_URL}/list/${listId}/remove_item?api_key=${TMDB_API_KEY}`,
    {
      media_id: mediaId,
      media_type: mediaType
    }
  );
  return response.data;
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
