import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

interface WatchHistory {
  id: number;
  title: string;
  poster_path: string;
  media_type: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  progress: number;
  timestamp: number;
}

const ContinueWatching = () => {
  const [history, setHistory] = useState<WatchHistory[]>([]);

  useEffect(() => {
    const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");
    const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recentHistory = watchHistory
      .filter((item: WatchHistory) => item.timestamp > twentyFourHoursAgo)
      .sort((a: WatchHistory, b: WatchHistory) => b.timestamp - a.timestamp);
    setHistory(recentHistory);
  }, []);

  if (!history.length) return null;

  return (
    <div className="space-y-2 relative category-row-container">
      <h2 className="text-xl font-medium px-[4%] text-white hover:text-gray-300 transition-colors duration-200">
        Continue Watching
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-[4%]">
        {history.map((item) => (
          <div key={item.id} className="relative">
            <MovieCard
              id={item.id}
              title={item.title}
              poster_path={item.poster_path}
              media_type={item.media_type}
              overview={item.overview}
              release_date={item.release_date}
              backdrop_path={item.backdrop_path}
            />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
              <div
                className="h-full bg-red-600"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;