import { Search, Bell, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { searchContent } from "@/lib/tmdb";
import { toast } from "sonner";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: searchResults } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchContent(searchQuery),
    enabled: searchQuery.length > 2,
  });

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-red-600 text-3xl font-bold">
            CINEPLAY
          </Link>
          <div className="hidden md:flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/tv" className="text-white hover:text-gray-300">
              TV Shows
            </Link>
            <Link to="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
            <Link to="/new" className="text-white hover:text-gray-300">
              New & Popular
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            {isSearchOpen && (
              <input
                type="text"
                placeholder="Search..."
                className="bg-black/80 text-white px-4 py-2 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
            <Search
              className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            />
            {searchResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-black/90 rounded shadow-lg">
                {searchResults.slice(0, 5).map((result: any) => (
                  <Link
                    key={result.id}
                    to={`/${result.media_type}/${result.id}`}
                    className="block px-4 py-2 hover:bg-gray-800"
                  >
                    {result.title || result.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Bell
            className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
            onClick={() => toast("No new notifications")}
          />
          <Link to="/profile">
            <User className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;