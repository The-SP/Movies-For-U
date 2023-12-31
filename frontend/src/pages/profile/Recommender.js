import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import API from "../../utils/API";
import MovieList from "../movies/MovieList";
import axiosInstance from "../../axios_instance";

const Recommender = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setIsLoading(true);

    console.log("Fetching the recommended movies from backend..");

    // Fetch the recommended movies from your Django API
    axiosInstance
      .get("api/recommendation/")
      .then((response) => {
        const recommendedIDs = response.data.recommended_indices;
        // console.log("Fetched Recommended ids:", recommendedIDs);

        // Check if recommendedIDs is empty or null
        if (!recommendedIDs || recommendedIDs.length === 0) {
        //   console.log("No recommended movies found.");
          return [];
        }

        return Promise.all(
          recommendedIDs.map((movie_id) => API.fetchMovie(movie_id))
        );
      })
      .then((moviesData) => {
        // console.log("Fetched recommended movies:", moviesData);
        const filteredMovies = moviesData.filter((movie) =>
          movie.hasOwnProperty("id")
        );

        setMovies(filteredMovies);
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
          You haven't liked any movies. To get recommendations, please like some movies first.
        </div>
      ) : (
        <MovieList movies={movies} heading={"Recommendations For U"} />
      )}
    </div>
  );
};

export default Recommender;
