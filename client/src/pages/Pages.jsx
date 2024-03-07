import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Detail from './Detail'
import Profile from './Profile'
import { Routes, Route } from 'react-router-dom';
import { RequireAuth } from '../component/RequireAuth'

function Pages() {
  return (
    <>
    <Routes>
      {/* Route for the home page */}
      <Route path='/' element={<Home />} />
       {/* Route for displaying stock details */}
      <Route path='/detail/:symbol' element={<Detail />} />
      {/* Route for displaying user profile, requiring authentication */}
      <Route path='/profile' element={<RequireAuth><Profile /></RequireAuth>} />
      {/* Route for displaying the login page */}
      <Route path="/login" element={<Login/>} />
      {/* Route for displaying the sign-up page */}
      <Route path="/register" element={<SignUp />} />
    </Routes>
        
    </>
  )
}

export default Pages