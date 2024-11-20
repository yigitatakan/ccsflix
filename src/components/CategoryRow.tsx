import MovieCard from "./MovieCard";

interface CategoryRowProps {
  title: string;
  movies: Array<{ id: number; title: string; imageUrl: string }>;
}

const CategoryRow = ({ title, movies }: CategoryRowProps) => {
  return (
    <div className="space-y-2 py-4">
      <h2 className="text-xl font-medium px-4">{title}</h2>
      <div className="category-row flex gap-2 overflow-x-auto px-4 pb-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryRow;