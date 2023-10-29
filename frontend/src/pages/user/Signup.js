import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import Spinner from "../../components/Spinner";

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill out all fields.");
      return;
    }

    setIsLoading(true);

    axiosInstance
      .post("auth/users/", {
        email: email,
        password: password,
        re_password: password,
        name: name,
      })
      .then((res) => {
        navigate("/login");
        console.log("New user account created:", name, email);
        setError("");
      })
      .catch((err) => {
        // console.log(err.request.responseText);
        // console.log(err.response.data.email, err.response.data.password);

        let newErrorMessage = "Email or Password is invalid.";
        if (err.response.data.email)
          newErrorMessage = err.response.data.email[0];
        else if (err.response.data.password)
          newErrorMessage = err.response.data.password[0];
        setError(newErrorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setEmail("");
    setPassword("");
    setName("");
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
                  <h2 className="fw-bold mb-2 text-uppercase">Sign Up</h2>
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
                      type="text"
                      id="typeUsernameX"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeUsernameX">
                      Full Name
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

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    Already have an account?{" "}
                    <Link to="/login" className="text-white-50 fw-bold">
                      Login
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

export default Signup;
