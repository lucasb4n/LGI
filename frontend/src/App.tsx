import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'

export default function App(){
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/main" element={<Main/>} />
      </Routes>
    </div>
  )
}
