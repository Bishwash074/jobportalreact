import React from 'react'

const About = (props) => {
  console.log(props)
  return (
    <div>
      <h1>My name is {props.name} and I am {props.age} years old</h1>
      this is inabout page
    </div>
  )
}

export default About