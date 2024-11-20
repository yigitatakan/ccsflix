import { useQuery } from "@tanstack/react-query";
import { getAccountDetails, getRatedMovies, getRatedTV, getWatchlistMovies, getWatchlistTV } from "@/lib/tmdb";
import MovieCard from "./MovieCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const Account = () => {
  const accountId = "20"; // You might want to get this from your auth context

  const { data: account } = useQuery({
    queryKey: ["account", accountId],
    queryFn: () => getAccountDetails(accountId)
  });

  const { data: ratedMovies, isLoading: isLoadingRatedMovies } = useQuery({
    queryKey: ["rated-movies", accountId],
    queryFn: () => getRatedMovies(accountId)
  });

  const { data: ratedTV, isLoading: isLoadingRatedTV } = useQuery({
    queryKey: ["rated-tv", accountId],
    queryFn: () => getRatedTV(accountId)
  });

  const { data: watchlistMovies, isLoading: isLoadingWatchlistMovies } = useQuery({
    queryKey: ["watchlist-movies", accountId],
    queryFn: () => getWatchlistMovies(accountId)
  });

  const { data: watchlistTV, isLoading: isLoadingWatchlistTV } = useQuery({
    queryKey: ["watchlist-tv", accountId],
    queryFn: () => getWatchlistTV(accountId)
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      {account && (
        <div className="mb-8">
          <h2 className="text-xl mb-2">Account Details</h2>
          <p>Username: {account.username}</p>
        </div>
      )}

      <Tabs defaultValue="rated-movies">
        <TabsList>
          <TabsTrigger value="rated-movies">Rated Movies</TabsTrigger>
          <TabsTrigger value="rated-tv">Rated TV Shows</TabsTrigger>
          <TabsTrigger value="watchlist-movies">Watchlist Movies</TabsTrigger>
          <TabsTrigger value="watchlist-tv">Watchlist TV Shows</TabsTrigger>
        </TabsList>

        <TabsContent value="rated-movies">
          {isLoadingRatedMovies ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ratedMovies?.map((movie) => (
                <MovieCard key={movie.id} {...movie} title={movie.title || movie.name || ''} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rated-tv">
          {isLoadingRatedTV ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ratedTV?.map((show) => (
                <MovieCard key={show.id} {...show} title={show.name || show.title || ''} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlist-movies">
          {isLoadingWatchlistMovies ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchlistMovies?.map((movie) => (
                <MovieCard key={movie.id} {...movie} title={movie.title || movie.name || ''} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="watchlist-tv">
          {isLoadingWatchlistTV ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[300px] w-full" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {watchlistTV?.map((show) => (
                <MovieCard key={show.id} {...show} title={show.name || show.title || ''} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Account;