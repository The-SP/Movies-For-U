import { useEffect, useState } from "react";
import API from "../utils/API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  // to display next page movies
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchMovies = (page, searchTerm = "") => {
    setError(false);
    setIsLoading(true);

    API.fetchMovies(searchTerm, page)
      .then((moviesData) => {
        if (
          moviesData &&
          moviesData.status_code &&
          moviesData.status_code === 7
        ) {
          // Wrong API key error
          console.log("Fetch error:", moviesData.status_message);
          setError(true);
        } else {
          console.log("fetchMovies:", moviesData);

          setMovies((prev) => ({
            ...moviesData,
            results:
              page > 1
                ? [...prev.results, ...moviesData.results]
                : [...moviesData.results],
          }));
        }
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
    if (!searchTerm) {
      // check if data is already in session storage else fetch from API
      const sessionState =
        sessionStorage && JSON.parse(sessionStorage.getItem("homeState"));

      if (sessionState) {
        console.log("Fetching from session storage");
        setMovies(sessionState);
        return;
      }
    }

    console.log("Fetching from API");
    setMovies(initialState); // remove old state before search
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  // Load More
  useEffect(() => {
    if (!isLoadingMore) return;

    fetchMovies(movies.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore]);

  // Write to session storage
  useEffect(() => {
    if (
      !searchTerm &&
      JSON.stringify(movies) !== JSON.stringify(initialState)
    ) {
      sessionStorage.setItem("homeState", JSON.stringify(movies));
    }
  }, [searchTerm, movies]);

  return {
    movies,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    setIsLoadingMore,
  };
};

export default useHomeFetch;
