import React from 'react'
import Login from './Login'
import SignUp from './SignUp'
import Home from './Home'
import Detail from './Detail'
import Profile from './Profile'
import { Routes, Route } from 'react-router-dom';

function Pages() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/detail' element={<Detail />} />
      <Route path='/profile' element={<Profile />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
        
    </>
  )
}

export default Pages