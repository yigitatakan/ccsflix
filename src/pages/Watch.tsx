import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [useBackupPlayer, setUseBackupPlayer] = useState(false);
  const [primaryPlayerLoaded, setPrimaryPlayerLoaded] = useState(false);

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

  useEffect(() => {
    // Set a timeout to switch to backup player if primary doesn't load
    const timeoutId = setTimeout(() => {
      if (!primaryPlayerLoaded) {
        setUseBackupPlayer(true);
      }
    }, 5000); // Wait 5 seconds before switching to backup

    return () => clearTimeout(timeoutId);
  }, [primaryPlayerLoaded]);

  const handlePrimaryPlayerLoad = () => {
    setPrimaryPlayerLoaded(true);
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

      {!useBackupPlayer ? (
        <iframe
          key="primary-player"
          src={primaryUrl}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          onLoad={handlePrimaryPlayerLoad}
        />
      ) : (
        <iframe
          key="backup-player"
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