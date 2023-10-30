import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <div className="container mt-4">
      <h2>Popular Movies</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
