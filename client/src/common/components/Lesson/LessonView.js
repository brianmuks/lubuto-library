import React from "react";
import { Link, withRouter } from 'react-router-dom'
import './style.css'
import { NavBar } from '../Landing'
import Lesson from './Lesson'

function LessonView({match}) {
  const { params: { id }  } = match
  
  return (
    <div className="row">
      <NavBar color={'light-blue '}/>
      <div
        className="col s12 m4 l3 sidebar "
      >
        <ul>
            <li>
              <Link to='/page/1'>Page 1</Link>
            </li>
            <li>
              <Link to='/page/2'>Page 2</Link>
            </li>
            <li>
              <Link to='/page/3'>Page 3</Link>
            </li>
        </ul>
      </div>
      <Lesson 
        id={id} 
        imageUrl={`/${id}.jpg`}
        caption={`This is for learning lesson ${id}`}
        />
    </div>
  );
}

export default withRouter(LessonView)
