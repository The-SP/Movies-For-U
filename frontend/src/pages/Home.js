import useHomeFetch from "../Hooks/useHomeFetch";
import Spinner from "../components/Spinner";
import MovieList from "./movies/MovieList";

const Home = () => {
  const {
    movies,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  } = useHomeFetch();

  //   console.log("[state] from home:", movies);

  if (error) return <div>Something went wrong...</div>;

  return (
    <div id="background-overlay">
      <MovieList movies={movies.results} />
      {isLoading && <Spinner />}
      {movies.page < movies.total_pages && !isLoading && (
        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-lg btn-outline-success"
            onClick={() => setIsLoadingMore(true)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
