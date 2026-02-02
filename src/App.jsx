import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='login' element={<Login/>}   />
        </Routes>
      </BrowserRouter>

      

    </div>
  )
}

export default App