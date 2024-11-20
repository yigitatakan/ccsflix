import { Play, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";

interface Movie {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  backdrop_path: string;
  media_type?: string;
}

interface HeroProps {
  movie?: Movie;
}

const Hero = ({ movie }: HeroProps) => {
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
        <div className="px-[4%] w-full max-w-[50%] space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            {movie.title || movie.name}
          </h1>
          <p className="text-lg text-gray-200 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex gap-3">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-300 transition font-medium"
            >
              <Play className="w-6 h-6 fill-current" />
              Play
            </Link>
            <button
              className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition font-medium"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;