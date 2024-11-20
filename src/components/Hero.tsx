import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { getTrending } from "@/lib/tmdb";
import { useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal";

const Hero = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
  });

  const movie = trending?.[Math.floor(Math.random() * (trending?.length || 1))];

  if (!movie) return null;

  return (
    <div className="relative h-[56.25vw] w-full">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 hero-gradient" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="px-[4%] w-full md:max-w-[50%] space-y-2 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold animate-fade-in line-clamp-2">
            {movie.title || movie.name}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 line-clamp-2 md:line-clamp-3 animate-fade-in">
            {movie.overview}
          </p>
          <div className="flex gap-2 md:gap-3">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-1 md:gap-2 bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded text-sm md:text-base hover:bg-gray-300 transition font-medium animate-fade-in"
            >
              <Play className="w-4 h-4 md:w-6 md:h-6 fill-current" />
              Play
            </Link>
            <button
              onClick={() => setSelectedMovie(movie)}
              className="flex items-center gap-1 md:gap-2 bg-gray-500/70 text-white px-4 md:px-8 py-2 md:py-3 rounded text-sm md:text-base hover:bg-gray-500/50 transition font-medium animate-fade-in"
            >
              <Info className="w-4 h-4 md:w-6 md:h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
};

export default Hero;