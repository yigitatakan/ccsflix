import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Info, Plus, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";

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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-netflix-black" />
          <div className="absolute bottom-0 left-0 p-6 space-y-4">
            <h2 className="text-4xl font-bold">{movie.title || movie.name}</h2>
            <div className="flex gap-3">
              <Link
                to={`/${movie.media_type || "movie"}/${movie.id}/watch`}
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
              >
                <Play className="w-5 h-5" /> Play
              </Link>
              <button className="flex items-center gap-2 bg-gray-500/70 text-white px-4 py-2 rounded hover:bg-gray-500/50 transition">
                <Plus className="w-5 h-5" /> My List
              </button>
              <button className="flex items-center gap-2 bg-gray-500/70 text-white p-2 rounded-full hover:bg-gray-500/50 transition">
                <ThumbsUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-500">97% Match</span>
            <span>{movie.release_date?.split("-")[0]}</span>
            <span className="border px-1">HD</span>
          </div>
          <p className="text-gray-200">{movie.overview}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;