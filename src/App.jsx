import { useState } from 'react'
import './App.css'
import LandingPage from './components/LandingPage/LandingPage'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { Route, Routes } from 'react-router-dom'

export default function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  )
}
