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

  if (!movies?.length) return null;

  return (
    <div className="space-y-2 relative category-row-container group">
      <h2 className="text-xl font-medium px-[4%] text-white hover:text-gray-300 transition-colors duration-200">
        {title}
      </h2>
      <div className="relative group">
        <button
          onClick={() => scroll("left")}
          className="scroll-button absolute left-0 z-40 h-[8.5vw] w-[4%] bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <div
          ref={rowRef}
          className="category-row flex gap-1 overflow-x-auto px-[4%] scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[16.66%] min-w-[200px] px-[0.2%] transition-transform duration-300">
              <MovieCard
                id={movie.id}
                title={movie.title || movie.name || ""}
                poster_path={movie.poster_path}
                media_type={movie.media_type}
                overview={movie.overview}
                release_date={movie.release_date}
                backdrop_path={movie.backdrop_path}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="scroll-button absolute right-0 z-40 h-[8.5vw] w-[4%] bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default CategoryRow;