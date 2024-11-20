import { useState } from "react";
import MovieDetailsModal from "./MovieDetailsModal";
import { Movie } from "@/lib/tmdb";

type MovieCardProps = Pick<Movie, "id" | "poster_path" | "media_type" | "overview" | "backdrop_path"> & {
  title: string;
};

const MovieCard = ({ id, title, poster_path, media_type = "movie", ...rest }: MovieCardProps) => {
  const [showModal, setShowModal] = useState(false);
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };
  
  return (
    <>
      <div 
        onClick={handleCardClick}
        className="movie-card relative rounded-md overflow-hidden cursor-pointer"
      >
        <img
          src={poster_path ? imageUrl : "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-xs sm:text-sm font-medium line-clamp-2">{title}</span>
        </div>
      </div>
      <MovieDetailsModal
        movie={{ id, title, poster_path, media_type, ...rest }}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default MovieCard;