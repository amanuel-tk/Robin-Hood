import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import { Routes, Route } from 'react-router-dom';

function Pages() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
        
    </>
  )
}

export default Pages