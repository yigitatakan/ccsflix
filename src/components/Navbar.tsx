import { Search, Bell, User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-8">
          <h1 className="text-netflix-red text-3xl font-bold">NETFLIX</h1>
          <div className="hidden md:flex gap-4">
            <a href="#" className="text-white hover:text-gray-300">Home</a>
            <a href="#" className="text-white hover:text-gray-300">TV Shows</a>
            <a href="#" className="text-white hover:text-gray-300">Movies</a>
            <a href="#" className="text-white hover:text-gray-300">New & Popular</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <Bell className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          <User className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;