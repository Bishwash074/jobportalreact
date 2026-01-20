import React from 'react'

const Navbar = () => {
const handleClick=()=>{
  alert("button clicked")
}
const name="bishwas"


  return (
    <div>
      <h1>This is navbar</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  )
}

export default Navbar