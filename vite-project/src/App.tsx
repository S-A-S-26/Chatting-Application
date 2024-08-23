import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { Route, Router, Routes } from 'react-router-dom'
import Registeration from './components/Registeration'
// import 'dotenv/config'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Registeration/>}/>
      </Routes>
    </>
  )
}

export default App
