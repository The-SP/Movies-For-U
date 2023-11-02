import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import AuthContext from "../../context/AuthContext";

const BookmarkIcon = ({ movie_id, heading }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isBookmarked, setIsBookmarked] = useState(heading === "Bookmarks");

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
    <>
      {isBookmarked ? (
        <i
          className="bi bi-bookmark-star-fill text-success fs-5 me-2"
          onClick={() => removeBookmark(movie_id)}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i
          className="bi bi-bookmark text-success fs-5 me-2"
          onClick={() => addBookmark(movie_id)}
          style={{ cursor: "pointer" }}
          data-toggle="tooltip" data-placement="bottom" title="Bookmark"
        ></i>
      )}
    </>
  );
};

export default BookmarkIcon;
