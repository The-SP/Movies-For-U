import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import useMovieFetch from "../../Hooks/useMovieFetch";
import { calcTime, convertMoney } from "../../utils/helpers";
import { IMAGE_BASE_URL } from "../../utils/config";
import BookmarkButton from "./BookmarkButton";

const Movie = () => {
  let { movieId } = useParams();
  const { movie, isLoading, error } = useMovieFetch(movieId);

  const releaseYear = new Date(movie.release_date).getFullYear();

  if (isLoading) return <Spinner />;
  if (error) return <h1>Something went wrong...</h1>;

  return (
    <div
      className="movie-detail-bg"
      style={{
        background: movie.backdrop_path
          ? `url(${IMAGE_BASE_URL}w1280${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className="movie-detail">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4">
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}w780${movie.poster_path}`}
                alt={movie.title}
                className="my-auto movie-detail-img"
              />
            )}
          </div>

          {/* Column 2 */}
          <div className="col-md-8 p-5">
            <h1>{movie.title}</h1>
            <p className="lead"> {releaseYear}</p>
            <p>{movie.overview}</p>

            {/* Information with Bootstrap Icons */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <span className="h5">Runtime: </span>
                <i className="bi bi-clock ms-2"></i>
                <span> {calcTime(movie.runtime)} mins</span>
              </div>
              <div className="col-md-6 mb-3">
                <span className="h5">Vote Average: </span>
                <i className="bi bi-star-fill ms-2"></i>
                <span> {movie.vote_average}</span>
              </div>
              <div className="col-md-6 mb-3">
                <span className="h5">Budget: </span>
                <i className="bi bi-cash ms-2"></i>
                <span> {convertMoney(movie.budget)}</span>
              </div>
              <div className="col-md-6 mb-3">
                <span className="h5">Revenue: </span>
                <i className="bi bi-wallet ms-2"></i>
                <span> {convertMoney(movie.revenue)}</span>
              </div>
            </div>

            <BookmarkButton movie_id={movie.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
