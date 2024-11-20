import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  media_type?: string;
}

interface CategoryRowProps {
  title: string;
  movies: Movie[];
}

const CategoryRow = ({ title, movies }: CategoryRowProps) => {
  return (
    <div className="space-y-2 py-4">
      <h2 className="text-xl font-medium px-4">{title}</h2>
      <div className="category-row flex gap-2 overflow-x-auto px-4 pb-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title || movie.name || ""}
            poster_path={movie.poster_path}
            media_type={movie.media_type}
            movie={movie}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;