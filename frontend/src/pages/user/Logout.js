import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import AuthContext from "../../context/AuthContext";

const Logout = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    setIsLoggedIn(false);
    navigate("/login");
  });
  return null;
};

export default Logout;