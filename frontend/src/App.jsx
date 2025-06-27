import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import Students from './components/Students'
import Gallery from './components/Gallery'
import Resource from './components/Resource'
import Admin from './components/Admin'
import Profile from './components/Profile'
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className=''>
                  <Routes>
          <Route path='/' element={<Home />} />
                              <Route path='/materials' element={<Resource />} />

          <Route path='/students' element={<Students />} />
          <Route path='/gallery' element={<Gallery />} />
                    <Route path='/resource' element={<Resource />} />
                                        <Route path='/admin' element={<Admin />} />
      <Route  path="/students/:id" element={<Profile/>}  />


        </Routes>

        </div>
      </BrowserRouter>
    </>
  )
}

export default App