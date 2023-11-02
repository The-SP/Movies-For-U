import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import API from "../../utils/API";
import MovieList from "../movies/MovieList";
import axiosInstance from "../../axios_instance";

const BookmarkedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    // Fetch the bookmarked movies from your Django API
    axiosInstance
      .get("api/profile/")
      .then((response) => {
        const bookmarkedIDs = response.data.bookmarked_movies
          .split(",")
          .filter(Boolean);
        // console.log("Fetched bookmarked ids:", bookmarkedIDs);

        // Check if bookmarkedIDs is empty or null
        if (!bookmarkedIDs || bookmarkedIDs.length === 0) {
          // console.log("No bookmarked movies found.");
          return [];
        }

        return Promise.all(
          bookmarkedIDs.map((movie_id) => API.fetchMovie(movie_id))
        );
      })
      .then((moviesData) => {
        // console.log("Fetched bookmarked movies:", moviesData);
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

  if (isLoading) return <Spinner />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="container mt-4">
      {movies.length === 0 ? (
        <div className="alert alert-info" role="alert">
          There are no movies in your bookmarks.
        </div>
      ) : (
        <MovieList movies={movies} heading={"Bookmarks"} />
      )}
    </div>
  );
};

export default BookmarkedMovies;
