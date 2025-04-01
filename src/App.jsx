import LandingPage from './components/LandingPage/LandingPage'
import ProtectedRoute from './utils/ProtectedRoutes'
import HomePage from './components/HomePage/HomePage'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react';
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import AuthContext, { AuthProvider } from './utils/AuthContext'
import './App.css'

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
        <Route path="/" element={
          isAuthenticated ? <Navigate to={'/home'} /> : <LandingPage />} />
        <Route path="/signin" element={
          isAuthenticated ? <Navigate to={'/home'} /> : <SignIn />} />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to={'/home'} /> : <SignUp />} />
        <Route path="/home" element={<ProtectedRoute auth={isAuthenticated} />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  )
}