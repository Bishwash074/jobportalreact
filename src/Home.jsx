import React, { useEffect, useState } from 'react'
import About from './About'

const Home = () => {
  const [data, setData] = useState(10)

  const incremeant = () => {
    if (data <= 10) {
      setData(data + 1)
    } else {
      alert("You have reached 10")
    }

  }

  const decrement = () => {
    setData(data - 1)
  }

  useEffect(()=>{
    console.log("Component mounted")

  },[data])



  return (
    <div>

      <h1>{data}</h1>
      <button onClick={incremeant}>increase</button>
      <button onClick={decrement}>decrease</button>

    </div>
  )
}

export default Home