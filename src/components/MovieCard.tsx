import { Link } from "react-router-dom";
import { getImageUrl } from "@/lib/tmdb";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
}

const MovieCard = ({ id, title, poster_path, media_type = "movie" }: MovieCardProps) => {
  return (
    <Link
      to={`/${media_type}/${id}`}
      className="movie-card relative flex-none w-[200px] md:w-[240px] group cursor-pointer"
    >
      <img
        src={getImageUrl(poster_path)}
        alt={title}
        className="w-full aspect-[2/3] object-cover rounded"
      />
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent rounded">
        <div className="p-3">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;