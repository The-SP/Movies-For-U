import { useEffect, useState } from "react";
import API from "../utils/API";

const useMovieFetch = (movieId) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovie = (movieId) => {
    setError(false);
    setIsLoading(true);

    API.fetchMovie(movieId)
      .then((movieData) => {
        console.log("fetch movie:", movieData);
        // Save the movie to session storage
        sessionStorage.setItem(movieId, JSON.stringify(movieData));
        setMovie(movieData);
      })
      .catch((err) => {
        console.log("Error:", err.message);
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  // Initial and search
  useEffect(() => {
    const sessionState =
      sessionStorage && JSON.parse(sessionStorage.getItem(movieId));
    if (sessionState) {
      setMovie(sessionState);
      setIsLoading(false);
    } else {
      fetchMovie(movieId);
    }
  }, [movieId]);

  return { movie, isLoading, error };
};

export default useMovieFetch;
