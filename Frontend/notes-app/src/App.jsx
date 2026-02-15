import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/Signup'

const App = () => {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Login />} /> 
  <Route path="/dashboard" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />
</Routes>
    </Router>
  )
}

export default App