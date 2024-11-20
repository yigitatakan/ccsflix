import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";
import {
  getPopular,
  getNewReleases,
  getMoviesByGenre,
  getKDramas,
  getTVShows,
  type Movie,
} from "@/lib/tmdb";

const GENRE_IDS = {
  horror: "27",
  scifi: "878",
  animation: "16",
  thriller: "53",
  romance: "10749",
  action: "28",
  comedy: "35",
  drama: "18"
};

const Index = () => {
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
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.action);
      return response.results;
    },
  });

  const { data: comedyMovies } = useQuery({
    queryKey: ["comedy"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.comedy);
      return response.results;
    },
  });

  const { data: dramaMovies } = useQuery({
    queryKey: ["drama"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.drama);
      return response.results;
    },
  });

  const { data: kdramas } = useQuery({
    queryKey: ["kdramas"],
    queryFn: getKDramas,
  });

  const { data: horrorMovies } = useQuery({
    queryKey: ["horror"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.horror);
      return response.results;
    },
  });

  const { data: sciFiMovies } = useQuery({
    queryKey: ["scifi"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.scifi);
      return response.results;
    },
  });

  const { data: animatedMovies } = useQuery({
    queryKey: ["animated"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.animation);
      return response.results;
    },
  });

  const { data: thrillerMovies } = useQuery({
    queryKey: ["thriller"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.thriller);
      return response.results;
    },
  });

  const { data: romanceMovies } = useQuery({
    queryKey: ["romance"],
    queryFn: async () => {
      const response = await getMoviesByGenre(GENRE_IDS.romance);
      return response.results;
    },
  });

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      <Hero />
      <div className="relative z-10 -mt-32 pb-8">
        <CategoryRow title="Popular on CCSFLIX" movies={popular || []} />
        <CategoryRow title="New Releases" movies={newReleases || []} />
        <CategoryRow title="Action & Adventure" movies={actionMovies || []} />
        <CategoryRow title="Comedy" movies={comedyMovies || []} />
        <CategoryRow title="Drama" movies={dramaMovies || []} />
        <CategoryRow title="Korean Dramas" movies={kdramas || []} />
        <CategoryRow title="Horror" movies={horrorMovies || []} />
        <CategoryRow title="Sci-Fi & Fantasy" movies={sciFiMovies || []} />
        <CategoryRow title="Animation" movies={animatedMovies || []} />
        <CategoryRow title="Thrillers" movies={thrillerMovies || []} />
        <CategoryRow title="Romance" movies={romanceMovies || []} />
      </div>
    </div>
  );
};

export default Index;