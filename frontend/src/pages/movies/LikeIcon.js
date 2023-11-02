import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import AuthContext from "../../context/AuthContext";


const LikeIcon = ({ movie_id, heading }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const [liked, setLiked] = useState((heading === "Liked Movies"));

  const addLike = (movie_id) => {
    if (!isLoggedIn) {
        navigate('/login')
        return;
    }

    axiosInstance
      .patch(`api/add_like/`, { movie_id: movie_id })
      .then((response) => {
        console.log(`Movie (${movie_id}) liked successfully!`);
        setLiked(true);
      })
      .catch((error) => {
        console.error("Error liking movie:", error);
      });
  };

  const removeLike = (movie_id) => {
    if (!isLoggedIn) {
        navigate('/login')
        return;
    }
    
    axiosInstance
      .patch(`api/remove_like/`, { movie_id: movie_id })
      .then((response) => {
        console.log(`Like removed for movie (${movie_id})`);
        setLiked(false);
      })
      .catch((error) => {
        console.error("Error removing like:", error);
      });
  };

  return (
    <>
      {liked ? (
        <i
          className="bi bi-heart-fill text-danger fs-5 me-2"
          onClick={() => removeLike(movie_id)}
          style={{ cursor: "pointer" }}
        ></i>
      ) : (
        <i
          className="bi bi-heart text-danger fs-5 me-2"
          onClick={() => addLike(movie_id)}
          style={{ cursor: "pointer" }}
          data-toggle="tooltip" data-placement="bottom" title="Like"
        ></i>
      )}
    </>
  );
};

export default LikeIcon;
