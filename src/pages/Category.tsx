import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import MovieCard from "@/components/MovieCard";
import { getMoviesByGenre, getTVShows } from "@/lib/tmdb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";

const Category = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "movie";
  const [sortBy, setSortBy] = useState("popularity.desc");

  const { data: content } = useQuery({
    queryKey: ["category", type, sortBy],
    queryFn: () => type === "tv" ? getTVShows(sortBy) : getMoviesByGenre("", sortBy),
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <div className="pt-24 px-[4%]">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {type === "tv" ? "TV Shows" : "Movies"}
          </h1>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] bg-black/50 text-white border-gray-700">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-black/90 text-white border-gray-700">
              <SelectItem value="popularity.desc">Most Popular</SelectItem>
              <SelectItem value="vote_average.desc">Highest Rated</SelectItem>
              <SelectItem value="release_date.desc">Latest Release</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {content?.map((item) => (
            <MovieCard
              key={item.id}
              id={item.id}
              title={item.title || item.name || ""}
              poster_path={item.poster_path}
              media_type={type}
              overview={item.overview}
              release_date={item.release_date}
              backdrop_path={item.backdrop_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;