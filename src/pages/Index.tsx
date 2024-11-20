import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryRow from "@/components/CategoryRow";

const SAMPLE_MOVIES = [
  {
    id: 1,
    title: "The Crown",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: 2,
    title: "Stranger Things",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: 3,
    title: "Wednesday",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    id: 4,
    title: "Bridgerton",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
  },
  {
    id: 5,
    title: "You",
    imageUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="relative z-10 -mt-32 space-y-8 pb-8">
        <CategoryRow title="Trending Now" movies={SAMPLE_MOVIES} />
        <CategoryRow title="Popular on Netflix" movies={SAMPLE_MOVIES} />
        <CategoryRow title="New Releases" movies={SAMPLE_MOVIES} />
      </div>
    </main>
  );
};

export default Index;