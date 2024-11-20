interface MovieCardProps {
  imageUrl: string;
  title: string;
}

const MovieCard = ({ imageUrl, title }: MovieCardProps) => {
  return (
    <div className="movie-card relative flex-none w-[200px] md:w-[240px] group cursor-pointer">
      <img
        src={imageUrl}
        alt={title}
        className="w-full aspect-video object-cover rounded"
      />
      <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/80 to-transparent rounded">
        <div className="p-3">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;