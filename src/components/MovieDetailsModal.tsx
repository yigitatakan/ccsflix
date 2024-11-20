import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getImageUrl } from "@/lib/tmdb";
import { Link } from "react-router-dom";

interface MovieDetailsModalProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal = ({ movie, isOpen, onClose }: MovieDetailsModalProps) => {
  if (!movie) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-netflix-black text-white overflow-hidden">
        <div className="relative">
          <img
            src={getImageUrl(movie.backdrop_path || movie.poster_path, "original")}
            alt={movie.title || movie.name}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black to-transparent" />
          <div className="absolute bottom-0 left-0 p-6">
            <h2 className="text-4xl font-bold mb-4">{movie.title || movie.name}</h2>
            <div className="flex gap-4">
              <Link
                to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
                className="bg-white text-black px-8 py-2 rounded hover:bg-opacity-80 transition"
              >
                Play
              </Link>
              <button
                onClick={onClose}
                className="bg-gray-500 bg-opacity-50 px-8 py-2 rounded hover:bg-opacity-70 transition"
              >
                More Info
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex gap-4 text-sm mb-4">
            <span className="text-green-500">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span>{movie.release_date?.split("-")[0]}</span>
          </div>
          <p className="text-gray-300">{movie.overview}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;