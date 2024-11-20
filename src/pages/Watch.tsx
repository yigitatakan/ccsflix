import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft } from "lucide-react";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();

  const { data: details } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
  });

  const embedUrl = type === "tv"
    ? `https://embed.su/embed/tv/${id}/1/1`
    : `https://embed.su/embed/movie/${id}`;

  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back to Browse</span>
        </button>
      </div>

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