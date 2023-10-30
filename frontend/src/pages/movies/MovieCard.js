import {Link} from 'react-router-dom'
import { IMAGE_BASE_URL } from '../../utils/config';

const MovieCard = ({ movie }) => {
  const releaseYear = new Date(movie.release_date).getFullYear();

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
          <h5 className="card-title text-white">{movie.title}</h5>
          <p className="card-text">{releaseYear}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
