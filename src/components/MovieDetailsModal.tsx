import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, Plus, ThumbsUp, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl, addToList, removeFromList, getSimilarMovies, getRecommendations } from "@/lib/tmdb";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface MovieDetailsModalProps {
  movie: any;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailsModal = ({ movie, isOpen, onClose }: MovieDetailsModalProps) => {
  const navigate = useNavigate();
  const [isInList, setIsInList] = useState(false);
  
  if (!movie) return null;

  const { data: similarMovies } = useQuery({
    queryKey: ["similar", movie.id],
    queryFn: () => getSimilarMovies(movie.id.toString()),
    enabled: isOpen
  });

  const { data: recommendations } = useQuery({
    queryKey: ["recommendations", movie.id],
    queryFn: () => getRecommendations(movie.id.toString()),
    enabled: isOpen
  });

  const handleAddToList = async () => {
    try {
      const listId = "8266034";
      await addToList(listId, movie.id, movie.media_type || "movie");
      setIsInList(true);
      toast.success("Added to My List");
    } catch (error) {
      toast.error("Failed to add to list. Please try again.");
    }
  };

  const handleRemoveFromList = async () => {
    try {
      const listId = "8266034";
      await removeFromList(listId, movie.id, movie.media_type || "movie");
      setIsInList(false);
      toast.success("Removed from My List");
    } catch (error) {
      toast.error("Failed to remove from list. Please try again.");
    }
  };

  const handleLike = () => {
    toast.success("Added to your liked titles");
  };

  const handleCategoryClick = (category: string) => {
    onClose();
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleMovieClick = (selectedMovie: any) => {
    onClose();
    navigate(`/${selectedMovie.media_type || "movie"}/${selectedMovie.id}/watch`);
  };

  const mediaType = movie.media_type || "movie";
  
  const categories = [
    mediaType.toUpperCase(),
    "Action",
    "Comedy",
    "Horror",
    "Romance",
    "Thriller",
    "Animation",
    "Drama",
    "Sci-Fi"
  ].filter(Boolean);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 bg-netflix-black text-white overflow-y-auto max-h-[90vh]">
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
              {!isInList ? (
                <button 
                  onClick={handleAddToList}
                  className="flex items-center gap-2 bg-gray-500/70 text-white px-4 py-2 rounded hover:bg-gray-500/50 transition"
                >
                  <Plus className="w-5 h-5" /> My List
                </button>
              ) : (
                <button 
                  onClick={handleRemoveFromList}
                  className="flex items-center gap-2 bg-gray-500/70 text-white px-4 py-2 rounded hover:bg-gray-500/50 transition"
                >
                  <X className="w-5 h-5" /> Remove
                </button>
              )}
              <button 
                onClick={handleLike}
                className="flex items-center gap-2 bg-gray-500/70 text-white p-2 rounded-full hover:bg-gray-500/50 transition"
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm">
              <span className="text-green-500">97% Match</span>
              <span>{movie.release_date?.split("-")[0]}</span>
              <span className="border px-1">HD</span>
            </div>
            <p className="text-gray-200">{movie.overview}</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  className="cursor-pointer hover:bg-primary/80"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {similarMovies && similarMovies.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Similar Titles</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarMovies.slice(0, 4).map((similar) => (
                  <div 
                    key={similar.id} 
                    className="space-y-2 cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleMovieClick(similar)}
                  >
                    <img
                      src={getImageUrl(similar.poster_path, "w500")}
                      alt={similar.title || similar.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-sm">{similar.title || similar.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recommendations && recommendations.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Recommended For You</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recommendations.slice(0, 4).map((recommendation) => (
                  <div 
                    key={recommendation.id} 
                    className="space-y-2 cursor-pointer hover:opacity-75 transition-opacity"
                    onClick={() => handleMovieClick(recommendation)}
                  >
                    <img
                      src={getImageUrl(recommendation.poster_path, "w500")}
                      alt={recommendation.title || recommendation.name}
                      className="w-full h-40 object-cover rounded"
                    />
                    <p className="text-sm">{recommendation.title || recommendation.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MovieDetailsModal;