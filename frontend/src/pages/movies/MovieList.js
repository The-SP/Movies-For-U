import MovieCard from "./MovieCard";

const MovieList = ({ movies, heading }) => {
  return (
    <div>
      <h2>{heading}</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} heading={heading} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
