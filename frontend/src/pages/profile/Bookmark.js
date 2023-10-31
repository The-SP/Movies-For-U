import { useEffect, useState } from "react";
import API from "../../utils/API";
import MovieList from "../movies/MovieList";

const Bookmark = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const movieIdList = [123, 456, 789, -1]; // Example list of movie IDs

  const getMoviesDetails = async () => {
    const moviesData = await Promise.all(movieIdList.map(id => API.fetchMovie(id)))
    return moviesData.filter(movieData => movieData && movieData.success !== false);
}

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    getMoviesDetails()
      .then((moviesData) => {
        console.log("fetch bookmarked movies:", moviesData);
        setMovies(moviesData);
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <div>Something went wrong...</div>

  return (
    <div className="container mt-4">
      <h2>Bookmarks</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default Bookmark;
