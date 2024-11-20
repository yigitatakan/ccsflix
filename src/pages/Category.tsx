import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { getTVShows, getMoviesByGenre, type MovieResponse } from "@/lib/tmdb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const GENRE_IDS: Record<string, string> = {
  action: "28",
  comedy: "35",
  horror: "27",
  thriller: "53",
  romance: "10749",
  drama: "18",
  scifi: "878",
  animation: "16",
  adventure: "12",
  crime: "80",
  documentary: "99",
  family: "10751",
  fantasy: "14",
  history: "36",
  music: "10402",
  mystery: "9648",
  war: "10752",
  western: "37"
};

const CATEGORY_NAMES: Record<string, string> = {
  tv: "TV Shows",
  action: "Action Movies",
  comedy: "Comedy Movies",
  horror: "Horror Movies",
  thriller: "Thriller Movies",
  romance: "Romance Movies",
  drama: "Drama Movies",
  scifi: "Sci-Fi Movies",
  animation: "Animation Movies",
  adventure: "Adventure Movies",
  crime: "Crime Movies",
  documentary: "Documentary Movies",
  family: "Family Movies",
  fantasy: "Fantasy Movies",
  history: "History Movies",
  music: "Music Movies",
  mystery: "Mystery Movies",
  war: "War Movies",
  western: "Western Movies"
};

const Category = () => {
  const { type } = useParams();
  const [sortBy, setSortBy] = useState("popularity.desc");
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ["category", type, sortBy],
    queryFn: async ({ pageParam = 1 }) => {
      if (type?.toLowerCase() === "tv") {
        return getTVShows(sortBy, pageParam as number);
      }
      const genreId = GENRE_IDS[type?.toLowerCase() || "action"];
      if (!genreId) {
        throw new Error("Invalid genre");
      }
      return getMoviesByGenre(genreId, pageParam as number);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: MovieResponse) => 
      lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Error loading content</div>
    </div>
  );

  const allMovies = data?.pages.flatMap(page => page.results) || [];
  const categoryName = CATEGORY_NAMES[type?.toLowerCase() || ""] || "Movies";

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-[4%]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {categoryName}
          </h1>
          <Select onValueChange={setSortBy} defaultValue={sortBy}>
            <SelectTrigger className="w-[180px] bg-black text-white border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-black text-white border-gray-700">
              <SelectItem value="popularity.desc">Most Popular</SelectItem>
              <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
              <SelectItem value="release_date.desc">Latest Release</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {allMovies.map((movie) => (
            <MovieCard
              key={`${movie.id}-${movie.title}`}
              id={movie.id}
              title={movie.title || movie.name || ""}
              poster_path={movie.poster_path}
              media_type={type === "tv" ? "tv" : "movie"}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
            />
          ))}
        </div>
        <div ref={ref} className="flex justify-center p-4">
          {isFetchingNextPage && (
            <div className="text-white">Loading more...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;