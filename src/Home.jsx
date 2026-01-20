import React from 'react'
import About from './About'

const Home = () => {
   let name='umesh'
   let age=24
  return (
    <div>
      this is about home page
        
      <About name={name} age={age}/>

    </div>
  )
}

export default Home