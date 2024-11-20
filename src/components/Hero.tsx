import { Play } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
          alt="Featured content"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="px-4 md:px-8 max-w-3xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">Stranger Things</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.
          </p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition">
              <Play className="w-6 h-6" />
              Play
            </button>
            <button className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded hover:bg-gray-500/50 transition">
              More Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;