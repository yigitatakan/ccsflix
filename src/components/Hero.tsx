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
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="px-4 md:px-8 max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {movie.title || movie.name}
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            {movie.overview}
          </p>
          <div className="flex gap-4">
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
              className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition"
            >
              <Play className="w-6 h-6" />
              Play
            </Link>
            <Link
              to={`/${movie.media_type || "movie"}/${movie.id}`}
              className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition"
            >
              <Info className="w-6 h-6" />
              More Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;