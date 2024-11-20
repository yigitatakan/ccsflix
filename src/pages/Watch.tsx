import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [useFallbackPlayer, setUseFallbackPlayer] = useState(false);
  const [primaryPlayerFailed, setPrimaryPlayerFailed] = useState(false);

  const { data: details } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
  });

  // Primary vidsrc.rip player URL
  const primaryUrl = type === "tv"
    ? `https://vidsrc.rip/embed/tv/${details?.external_ids?.imdb_id || id}/1/1`
    : `https://vidsrc.rip/embed/movie/${details?.external_ids?.imdb_id || id}`;

  // Backup Anyembed player URL
  const backupUrl = type === "tv"
    ? `https://player.autoembed.cc/embed/tv/${details?.external_ids?.imdb_id || id}/1/1`
    : `https://player.autoembed.cc/embed/movie/${details?.external_ids?.imdb_id || id}`;

  const handlePrimaryPlayerError = () => {
    setPrimaryPlayerFailed(true);
    toast.error("Content not available on primary server");
  };

  const tryFallbackServer = () => {
    setUseFallbackPlayer(true);
    toast.success("Switching to backup server");
  };

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

      {!useFallbackPlayer ? (
        <>
          <iframe
            src={primaryUrl}
            className="w-full h-full"
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            onError={handlePrimaryPlayerError}
          />
          {primaryPlayerFailed && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-white mb-4">Content not available on primary server</p>
              <Button 
                onClick={tryFallbackServer}
                variant="secondary"
              >
                Try Backup Server
              </Button>
            </div>
          )}
        </>
      ) : (
        <iframe
          src={backupUrl}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
        />
      )}
    </div>
  );
};

export default Watch;