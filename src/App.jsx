import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'

const App = () => {
  return (
    <div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </BrowserRouter>

      

    </div>
  )
}

export default App