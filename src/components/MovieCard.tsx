import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  media_type?: string;
}

const MovieCard = ({ id, title, poster_path, media_type = "movie" }: MovieCardProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;
  
  return (
    <Link 
      to={`/${media_type}/${id}/watch`} 
      className="movie-card relative min-w-[200px] h-[300px] rounded-md overflow-hidden"
    >
      <img
        src={poster_path ? imageUrl : "/placeholder.svg"}
        alt={title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span className="text-white text-sm font-medium">{title}</span>
      </div>
    </Link>
  );
};

export default MovieCard;