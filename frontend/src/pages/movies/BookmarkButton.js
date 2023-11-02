import { useState, useContext } from "react";
import {useNavigate} from 'react-router-dom'
import axiosInstance from "../../axios_instance";
import AuthContext from "../../context/AuthContext";

const BookmarkButton = ({ movie_id }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate()

  const [isBookmarked, setIsBookmarked] = useState(false);

  const addBookmark = (movie_id) => {
    if (!isLoggedIn) {
        navigate('/login')
        return;
    }

    axiosInstance
      .patch(`api/add_bookmark/`, { movie_id: movie_id })
      .then((response) => {
        console.log(`Movie (${movie_id}) bookmarked successfully!`);
        setIsBookmarked(true);
      })
      .catch((error) => {
        console.error("Error bookmarking movie:", error);
      });
  };

  const removeBookmark = (movie_id) => {
    if (!isLoggedIn) {
        navigate('/login')
        return;
    }

    axiosInstance
      .patch(`api/remove_bookmark/`, { movie_id: movie_id })
      .then((response) => {
        console.log(`Movie (${movie_id}) bookmark removed!`);
        setIsBookmarked(false);
      })
      .catch((error) => {
        console.error("Error removing bookmark:", error);
      });
  };

  return (
    <div className="mt-3">
      {isBookmarked ? (
        <button
          className="btn btn-dark btn-lg"
          onClick={() => removeBookmark(movie_id)}
        >
          <i className="bi bi-bookmark-star-fill text-success fs-5 me-2"></i>{" "}
          Bookmarked
        </button>
      ) : (
        <button
          className="btn btn-dark btn-lg"
          onClick={() => addBookmark(movie_id)}
        >
          <i className="bi bi-bookmark text-success fs-5 me-2"></i> Bookmark
        </button>
      )}
    </div>
  );
};

export default BookmarkButton;
