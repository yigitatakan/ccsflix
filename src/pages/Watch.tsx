import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails } from "@/lib/tmdb";
import MovieDetailsModal from "@/components/MovieDetailsModal";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const { data: details } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id),
  });

  useEffect(() => {
    if (details) {
      const watchHistory = JSON.parse(localStorage.getItem("watchHistory") || "[]");
      const historyItem = {
        id: Number(id),
        title: details.title || details.name,
        poster_path: details.poster_path,
        media_type: details.media_type || "movie",
        overview: details.overview,
        release_date: details.release_date,
        backdrop_path: details.backdrop_path,
        progress: 0,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        "watchHistory",
        JSON.stringify([
          ...watchHistory.filter((item: any) => item.id !== Number(id)),
          historyItem,
        ])
      );
    }
  }, [details, id]);

  if (!details) return null;

  return (
    <div className="relative">
      <h1 className="text-4xl font-bold">{details.title || details.name}</h1>
      <MovieDetailsModal
        movie={details}
        isOpen={true}
        onClose={() => {}}
      />
    </div>
  );
};

export default Watch;
