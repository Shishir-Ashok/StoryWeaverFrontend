import LandingPage from "./components/LandingPage/LandingPage";
import ProtectedRoute from "./utils/ProtectedRoutes";
import HomePage from "./components/HomePage/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import AuthContext, { AuthProvider } from "./utils/AuthContext";
import "./App.css";
import CreatePost from "./components/CreatePost/CreatePost";
import SinglePost from "./components/SinglePost/SinglePost";
import EditPostPage from "./components/EditPostPage/EditPostPage";

export default function App() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  // console.log("APP.jsx \nLoading: ", loading, "\nisAuth: ", isAuthenticated);

  // avoid rendering the app until the loading state is false
  if (loading) {
    console.log("APP.jsx \nLoading: ", loading, "\nisAuth: ", isAuthenticated);
    return null;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to={"/home"} /> : <LandingPage />
          }
        />
        <Route
          path="/signin"
          element={isAuthenticated ? <Navigate to={"/home"} /> : <SignIn />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to={"/home"} /> : <SignUp />}
        />
        <Route path="/home" element={<ProtectedRoute auth={isAuthenticated} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
        <Route
          path="/create"
          element={<ProtectedRoute auth={isAuthenticated} />}
        >
          <Route path="/create" element={<CreatePost />} />
        </Route>
        <Route
          path="/post/:id"
          element={<ProtectedRoute auth={isAuthenticated} />}
        >
          <Route path="/post/:id" element={<SinglePost />} />
        </Route>
        <Route
          path="/edit/:id"
          element={<ProtectedRoute auth={isAuthenticated} />}
        >
          <Route path="/edit/:id" element={<EditPostPage />} />
        </Route>
      </Routes>
    </>
  );
}
