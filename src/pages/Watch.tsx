import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");

  const { data: details, error } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
    retry: false,
  });

  useEffect(() => {
    if (error) {
      toast.error("Content not found");
    }
  }, [error]);

  const handleBack = () => {
    navigate("/");
  };

  const embedUrl = type === "tv"
    ? `https://embed.su/embed/tv/${id}/${season}/${episode}`
    : `https://embed.su/embed/movie/${id}`;

  if (error) {
    return (
      <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-white text-2xl mb-4">Content Not Found</h1>
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Button>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-black">
      <div className="absolute top-0 left-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Browse</span>
          </button>
          
          {type === "tv" && details && (
            <div className="flex items-center gap-4">
              <Select
                value={season}
                onValueChange={setSeason}
              >
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: details.number_of_seasons || 1 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Season {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={episode}
                onValueChange={setEpisode}
              >
                <SelectTrigger className="w-[180px] bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Episode" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      Episode {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
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