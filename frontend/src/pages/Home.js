import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../axios_instance";

const Home = () => {
  const [current_user, setCurrentUser] = useState(null);
  useEffect(() => {
    axiosInstance
      .get("auth/users/me/")
      .then((res) => {
        // console.log("Current logged in user:", res.data);
        setCurrentUser(res.data);
      })
      .catch((err) => console.log("Fetch logged in user error:", err));
  }, []);

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        {current_user && (
          <h1 className="display-4">Welcome, {current_user.name}</h1>
        )}

        {!current_user && (
          <Link className="btn btn-primary btn-lg" to="/login" role="button">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
