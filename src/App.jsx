import LandingPage from './components/LandingPage/LandingPage'
import ProtectedRoute from './utils/ProtectedRoutes'
import HomePage from './components/HomePage/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import './App.css'
import { useState, useEffect } from 'react'

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Check if the user is authenticated when the component mounts
  useEffect(() => {
    const verifyUser = () => {
      // authCheck holds the userInfo object with id along with iat and exp timestamps if authenticated, otherwise we set the value to false

      const authCheck = fetch('http://localhost:3000/profile', {
        method: 'GET',
        credentials: 'include', // include cookies
      }).then((response) => {
        response.json().then((userInfo) => {
          setIsAuthenticated(userInfo.id ? true : false);
          // console.log("APP.JSX userInfo: ", userInfo);
          return userInfo.id ? true : false;
          // if user is authenticated, the userInfo will contain the id, otherwise we return false
        });
      });
    };
    verifyUser();
  }, []);

  // avoid rendering the app until the loading state is false
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={
          isAuthenticated? <Navigate to={'/home'} /> : <LandingPage />} />
        <Route path="/signin" element={
          isAuthenticated? <Navigate to={'/home'} /> : <SignIn />} />
        <Route path="/signup" element={
          isAuthenticated? <Navigate to={'/home'} /> : <SignUp />} />
        <Route path="/home" element={<ProtectedRoute auth={isAuthenticated} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}
