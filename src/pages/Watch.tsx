import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft, Volume2, VolumeX, Maximize, Minimize, Play, Pause } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  let controlsTimer: NodeJS.Timeout;

  const { data: details } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
  });

  const embedUrl = type === "tv"
    ? `https://vidsrc.rip/embed/tv/${details?.external_ids?.imdb_id || id}/1/1`
    : `https://vidsrc.rip/embed/movie/${details?.external_ids?.imdb_id || id}`;

  const handleMouseMove = useCallback(() => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimer);
    controlsTimer = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
  }, [isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      clearTimeout(controlsTimer);
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const toggleMute = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const newUrl = new URL(iframe.src);
      newUrl.searchParams.set('muted', (!isMuted).toString());
      iframe.src = newUrl.toString();
      setIsMuted(!isMuted);
      toast(isMuted ? "Unmuted" : "Muted");
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      const newUrl = new URL(iframe.src);
      newUrl.searchParams.set('autoplay', (!isPlaying).toString());
      iframe.src = newUrl.toString();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black w-screen h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      {/* Back Button and Controls */}
      <div 
        className={`absolute top-0 left-0 w-full z-[60] transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-gradient-to-b from-black/80 to-transparent p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="hidden sm:inline">Back to Browse</span>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <div className="relative w-full h-full">
        <iframe
          src={`${embedUrl}?autoplay=true&muted=${isMuted}`}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
          allow="autoplay; fullscreen; picture-in-picture"
          style={{ pointerEvents: isControlsVisible ? 'none' : 'auto' }}
        />
      </div>

      {/* Player Controls */}
      <div 
        className={`absolute bottom-0 left-0 w-full z-[60] transition-opacity duration-300 ${
          isControlsVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="bg-gradient-to-t from-black/80 to-transparent px-4 py-6">
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="hover:text-gray-300 transition-colors p-2"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={toggleMute}
                className="hover:text-gray-300 transition-colors p-2"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="text-sm font-medium hidden sm:block">
                {details?.title || details?.name}
              </div>
            </div>
            <button
              onClick={toggleFullscreen}
              className="hover:text-gray-300 transition-colors p-2"
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;