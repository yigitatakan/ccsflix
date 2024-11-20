import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "./MovieCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Movie } from "@/lib/tmdb";

interface CategoryRowProps {
  title: string;
  movies: Movie[];
}

const CategoryRow = ({ title, movies }: CategoryRowProps) => {
  if (!movies?.length) return null;

  return (
    <div className="space-y-2 relative category-row-container">
      <h2 className="text-xl font-medium px-[4%] text-white hover:text-gray-300 transition-colors duration-200">
        {title}
      </h2>
      <div className="relative px-[4%]">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {movies.map((movie) => (
              <CarouselItem key={movie.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/6">
                <div className="movie-card-container">
                  <MovieCard
                    id={movie.id}
                    title={movie.title || movie.name || ""}
                    poster_path={movie.poster_path}
                    media_type={movie.media_type}
                    overview={movie.overview}
                    backdrop_path={movie.backdrop_path}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className="absolute left-[2%] z-40 h-[8.5vw] w-[4%] bg-black/30 hover:bg-black/60 border-none rounded-none"
          />
          <CarouselNext 
            className="absolute right-[2%] z-40 h-[8.5vw] w-[4%] bg-black/30 hover:bg-black/60 border-none rounded-none"
          />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryRow;