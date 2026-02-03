import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Register from './components/Register'
import Login from './components/Login'
import JobProviderDashboard from './components/JobProviderDashboard'
import JobCreateForm from './components/JobCreateForm'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/jobprovider" element={<JobProviderDashboard />} />
          <Route path="/jobcreate" element={<JobCreateForm />} />
        </Routes>
      </BrowserRouter>



    </div>
  )
}

export default App