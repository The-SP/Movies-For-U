import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import API from "../../utils/API";
import MovieList from "../movies/MovieList";
import axiosInstance from "../../axios_instance";

const LikedMovies = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);
    // Fetch the liked movies from your Django API
    axiosInstance
      .get("api/profile/")
      .then((response) => {
        const likedIDs = response.data.liked_movies.split(",").filter(Boolean);

        if (!likedIDs || likedIDs.length === 0) {
          return [];
        }

        return Promise.all(
          likedIDs.map((movie_id) => API.fetchMovie(movie_id))
        );
      })
      .then((moviesData) => {
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
          There are no liked movies.
        </div>
      ) : (
        <MovieList movies={movies} heading={"Liked Movies"} />
      )}
    </div>
  );
};

export default LikedMovies;
