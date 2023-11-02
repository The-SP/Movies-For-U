import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import Logout from "./pages/user/Logout";
import Signup from "./pages/user/Signup";
import ResetPassword from "./pages/user/ResetPassword";
import ResetPasswordConfirm from "./pages/user/ResetPasswordConfirm";
import Movie from "./pages/movies/MovieDetail";
import BookmarkedMovies from "./pages/profile/BookmarkedMovies";
import LikedMovies from "./pages/profile/LikedMovies";
import Recommender from "./pages/profile/Recommender";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* user pages */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />

          <Route path=":movieId" element={<Movie />} />
          {/* profile pages */}
          <Route
            exact
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarkedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/likes"
            element={
              <ProtectedRoute>
                <LikedMovies />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/recommendation"
            element={
              <ProtectedRoute>
                <Recommender />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
