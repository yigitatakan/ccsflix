import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";
import { getTrending, getPopular, getNewReleases } from "@/lib/tmdb";

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

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero movie={trending?.[0]} />
      <div className="relative z-10 -mt-32 space-y-8 pb-8">
        <CategoryRow title="Trending Now" movies={trending || []} />
        <CategoryRow title="Popular on CinePlay" movies={popular || []} />
        <CategoryRow title="New Releases" movies={newReleases || []} />
      </div>
    </main>
  );
};

export default Index;