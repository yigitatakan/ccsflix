import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchContent } from "@/lib/tmdb";
import { toast } from "sonner";
import MovieDetailsModal from "./MovieDetailsModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  const { data: searchResults } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchContent(searchQuery),
    enabled: searchQuery.length > 2,
  });

  const handleNavigation = (path: string) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    navigate(path);
  };

  const showMyList = () => {
    toast.info("My List feature coming soon!");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-red-600 text-3xl font-bold">
            CINEPLAY
          </Link>
          <div className="hidden md:flex gap-4">
            <button onClick={() => handleNavigation("/")} className="text-white hover:text-gray-300">Home</button>
            <button onClick={() => handleNavigation("/category/tv")} className="text-white hover:text-gray-300">TV Shows</button>
            <button onClick={() => handleNavigation("/category/action")} className="text-white hover:text-gray-300">Action</button>
            <button onClick={() => handleNavigation("/category/comedy")} className="text-white hover:text-gray-300">Comedy</button>
            <button onClick={() => handleNavigation("/category/horror")} className="text-white hover:text-gray-300">Horror</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex items-center">
              {isSearchOpen && (
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-black/80 text-white px-4 py-2 rounded-l border-r border-gray-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              )}
              <button
                className={`p-2 ${isSearchOpen ? 'bg-black/80 rounded-r' : ''}`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search className="w-6 h-6 text-white hover:text-gray-300" />
              </button>
            </div>
            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-black/90 rounded shadow-lg">
                {searchResults.slice(0, 5).map((result: any) => (
                  <div
                    key={result.id}
                    className="flex items-center gap-2 p-2 hover:bg-gray-800 cursor-pointer"
                    onClick={() => setSelectedMovie(result)}
                  >
                    {result.poster_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w92${result.poster_path}`}
                        alt={result.title || result.name}
                        className="w-12 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="text-white font-medium">{result.title || result.name}</p>
                      <p className="text-gray-400 text-sm">
                        {result.media_type}
                        {result.media_type === 'tv' && result.number_of_episodes && (
                          <span className="ml-2">({result.number_of_episodes} episodes)</span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Bell
            className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
            onClick={() => toast("No new notifications")}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="focus:outline-none">
                <User className="w-6 h-6 text-white hover:text-gray-300" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 bg-black/90 text-white border-gray-700">
              <DropdownMenuItem onClick={showMyList} className="cursor-pointer hover:bg-gray-800">
                My List
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("Account settings coming soon!")} className="cursor-pointer hover:bg-gray-800">
                Account Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {selectedMovie && (
        <MovieDetailsModal
          movie={selectedMovie}
          isOpen={!!selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </nav>
  );
};

export default Navbar;