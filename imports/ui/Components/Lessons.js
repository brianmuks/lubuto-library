
import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <div className="nav">
      <ul>
        <li>Lesson 1 </li>
        <li>Lesson 2</li>
      </ul>
      <Link to="/"><button>Back Home</button></Link>
    </div>
  )
}