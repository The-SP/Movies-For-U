import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axios_instance";
import Spinner from "../../components/Spinner";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required.");
      return;
    }
    setIsLoading(true);
    axiosInstance
      .post("auth/users/reset_password/", { email })
      .then((res) => {
        setEmail("");
        setError("");
        navigate("/login");
      })
      .catch((err) => {
        //   console.log(err);
        if (err.response.data.email) setError(err.response.data.email[0]);
        else setError("Email is invalid.");
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  <h2 className="fw-bold mb-2 text-uppercase">
                    Forgot password?
                  </h2>
                  <p className="text-white-50 mb-5">
                    No worries, we'll send you reset instructions.
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

                  <div className="error text-danger fw-bold mb-4">{error}</div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Reset Password
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    <Link to="/login" className="text-white-50 fw-bold">
                      Back to Login
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

export default ResetPassword;
