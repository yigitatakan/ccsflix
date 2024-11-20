import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import MovieCard from "@/components/MovieCard";
import Navbar from "@/components/Navbar";
import { getTVShows, getMoviesByGenre, Movie } from "@/lib/tmdb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

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

const Category = () => {
  const { type } = useParams();
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data: movies, isLoading } = useQuery({
    queryKey: ["category", type, sortBy],
    queryFn: async () => {
      if (type?.toLowerCase() === "tv") {
        return getTVShows(sortBy);
      }
      const genreId = GENRE_IDS[type?.toLowerCase() || "action"];
      if (!genreId) {
        throw new Error("Invalid genre");
      }
      return getMoviesByGenre(genreId);
    },
  });

  if (isLoading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-[4%]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {type === "tv" ? "TV Shows" : `${type?.charAt(0).toUpperCase()}${type?.slice(1)} Movies`}
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
          {movies?.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || ""}
              poster_path={movie.poster_path}
              media_type={type === "tv" ? "tv" : "movie"}
              overview={movie.overview}
              backdrop_path={movie.backdrop_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;