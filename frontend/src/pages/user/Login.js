import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import AuthContext from "../../context/AuthContext";
import Spinner from '../../components/Spinner'

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    axiosInstance
      .post("auth/jwt/create/", { email: email, password: password })
      .then((res) => {
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        setIsLoggedIn(true);
        navigate("/");
        setError("");
      })
      .catch((err) => {
        // console.log("Login error:", err.request.responseText);
        setError("Email or Password is invalid.");
      })
      .finally(() => {
        setIsLoading(false);
      });
    setEmail("");
    setPassword("");
  };

  if (isLoading) return <Spinner />

  return (
    <section>
      <div className="container vh-100">
        <div className="row d-flex justify-content-center align-items-center py-2">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: 1 + "rem" }}
            >
              <div className="card-body p-5 text-center">
                <div className="pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5">
                    Please enter your login and password!
                  </p>

                  <div className="form-outline form-white mb-4">
                    <input
                      autoFocus
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeEmailX">
                      Email
                    </label>
                  </div>

                  <div className="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typePasswordX">
                      Password
                    </label>
                  </div>

                  <div className="error text-danger fw-bold mb-4">{error}</div>

                  <p className="small mb-4 pb-lg-2">
                    <Link
                      to="/reset-password"
                      className="text-white-50 fw-bold"
                    >
                      Forgot password?
                    </Link>
                  </p>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-white-50 fw-bold">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
