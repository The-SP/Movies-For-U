import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../../utils/config";
import BookmarkIcon from "./BookmarkIcon";

const MovieCard = ({ movie, heading }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();

  if (!movie.poster_path) return;

  return (
    <div className="col-lg-3 col-md-6 col-sm-6 mb-4">
      <div className="movie-card">
        <Link to={`/${movie.id}`}>
          <img
            src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
            alt={movie.title}
            className="card-img-top movie-img"
          />
        </Link>
        <div className="card-body p-1">
          <div className="row align-items-center">
            <div className="col">
              <h5 className="card-title text-white mt-1">{movie.title}</h5>
              <p className="card-text">{releaseYear}</p>
            </div>

            <div className="col-auto align-self-start">
              <BookmarkIcon movie_id={movie.id} heading={heading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
