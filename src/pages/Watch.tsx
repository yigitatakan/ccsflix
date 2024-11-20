import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";

const Watch = () => {
  const { type, id } = useParams();
  const { data: details } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
  });

  const embedUrl = type === "tv"
    ? `https://vidsrc.rip/embed/tv/${details?.external_ids?.imdb_id || id}/1/1`
    : `https://vidsrc.rip/embed/movie/${details?.external_ids?.imdb_id || id}`;

  return (
    <div className="h-screen w-screen bg-black">
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
      />
    </div>
  );
};

export default Watch;