import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getTVDetails } from "@/lib/tmdb";
import { ArrowLeft, Volume2, VolumeX, Maximize, Minimize } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const Watch = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  let controlsTimer: NodeJS.Timeout;

  const { data: details } = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => (type === "tv" ? getTVDetails(id!) : getMovieDetails(id!)),
  });

  const embedUrl = type === "tv"
    ? `https://vidsrc.rip/embed/tv/${details?.external_ids?.imdb_id || id}/1/1`
    : `https://vidsrc.rip/embed/movie/${details?.external_ids?.imdb_id || id}`;

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleMouseMove = () => {
    setIsControlsVisible(true);
    clearTimeout(controlsTimer);
    controlsTimer = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

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

  return (
    <div 
      className="relative h-screen w-screen bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Back Button and Controls */}
      <div className={`absolute top-0 left-0 w-full z-50 transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-b from-black/80 to-transparent p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Browse</span>
          </button>
        </div>
      </div>

      {/* Video Player */}
      <iframe
        src={`${embedUrl}?autoplay=true&muted=${isMuted}`}
        className="w-full h-full"
        allowFullScreen
        allow="autoplay; fullscreen; picture-in-picture"
      />

      {/* Player Controls */}
      <div className={`absolute bottom-0 left-0 w-full z-50 transition-opacity duration-300 ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMute}
                className="hover:text-gray-300 transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
              <div className="text-sm">
                {details?.title || details?.name}
              </div>
            </div>
            <button
              onClick={toggleFullscreen}
              className="hover:text-gray-300 transition-colors"
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