import { useState } from "react";
import axiosInstance from "../../axios_instance";

const BookmarkButton = ({ movie_id }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const addBookmark = (movie_id) => {
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
    </>
  );
};

export default BookmarkButton;
