import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";
import { getTrending, getPopular, getNewReleases, getMoviesByGenre, getKDramas } from "@/lib/tmdb";

const GENRE_IDS = {
  action: "28",
  comedy: "35",
  drama: "18",
};

const Index = () => {
  const { data: trending } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  const { data: popular } = useQuery({
    queryKey: ["popular"],
    queryFn: getPopular,
  });

  const { data: newReleases } = useQuery({
    queryKey: ["newReleases"],
    queryFn: getNewReleases,
  });

  const { data: actionMovies } = useQuery({
    queryKey: ["action"],
    queryFn: () => getMoviesByGenre(GENRE_IDS.action),
  });

  const { data: comedyMovies } = useQuery({
    queryKey: ["comedy"],
    queryFn: () => getMoviesByGenre(GENRE_IDS.comedy),
  });

  const { data: dramaMovies } = useQuery({
    queryKey: ["drama"],
    queryFn: () => getMoviesByGenre(GENRE_IDS.drama),
  });

  const { data: kdramas } = useQuery({
    queryKey: ["kdramas"],
    queryFn: getKDramas,
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <Hero movie={trending?.[0]} />
      <div className="relative z-10 -mt-32 pb-8 space-y-8">
        <CategoryRow title="Trending Now" movies={trending || []} />
        <CategoryRow title="Popular on CinePlay" movies={popular || []} />
        <CategoryRow title="New Releases" movies={newReleases || []} />
        <CategoryRow title="Action Movies" movies={actionMovies || []} />
        <CategoryRow title="Comedy Movies" movies={comedyMovies || []} />
        <CategoryRow title="Drama Movies" movies={dramaMovies || []} />
        <CategoryRow title="Korean Dramas" movies={kdramas || []} />
      </div>
    </div>
  );
};

export default Index;