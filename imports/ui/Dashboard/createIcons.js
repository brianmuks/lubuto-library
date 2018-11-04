import React from 'react'
import { Link } from 'react-router-dom'

export const Icons = () => {
    return (
        <div className="title">
          <h3>Icons will be created from here</h3>
          <i className="material-icons">home</i>
          <Link to="/lessons"><button>Show the Lessons</button></Link>
        </div>
    )
  }
