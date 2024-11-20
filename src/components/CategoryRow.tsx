import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";

interface Movie {
  id: number;
  title: string;
  name?: string;
  poster_path: string;
  media_type?: string;
  overview?: string;
  release_date?: string;
  backdrop_path?: string;
}

interface CategoryRowProps {
  title: string;
  movies: Movie[];
}

const CategoryRow = ({ title, movies }: CategoryRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-2 py-4 group/row">
      <h2 className="text-xl font-medium px-4">{title}</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-40 h-full w-12 bg-black/30 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <div
          ref={rowRef}
          className="category-row flex gap-2 overflow-x-auto px-4 pb-4 scroll-smooth"
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title || movie.name || ""}
              poster_path={movie.poster_path}
              media_type={movie.media_type}
              overview={movie.overview}
              release_date={movie.release_date}
              backdrop_path={movie.backdrop_path}
            />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-40 h-full w-12 bg-black/30 opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;