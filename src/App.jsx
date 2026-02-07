import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './About'
import Register from './components/Register'
import Login from './components/Login'
import JobProviderDashboard from './components/JobProviderDashboard'
import JobCreateForm from './components/JobCreateForm'
import Home from './components/Home'
import SIngleJob from './components/SIngleJob'
import ApplyJob from './components/ApplyJob'
import Myapplication from './components/Myapplication'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path="/admin/dashboard" element={<JobProviderDashboard />} />
          <Route path="/jobcreate" element={<JobCreateForm />} />
          <Route path='/jobgetbyid/:id' element={<SIngleJob/>} />
          <Route path='/applyJob/:jobId' element={<ApplyJob/>}  />
          <Route path='/user/dashboard' element={<Myapplication/>} />
        </Routes>
      </BrowserRouter>



    </div>
  )
}

export default App