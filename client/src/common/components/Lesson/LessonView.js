import React from "react";
import { Link, withRouter, NavLink } from 'react-router-dom'
import './style.css'
import { NavBar } from '../Landing'
import Lesson from './Lesson'

// It would be good to know how many pages a lesson has
const pages = 4
const style = {
    fontWeight: "bold",
    color: "teal",
}
function LessonView({match, history}) {
  const { params: { id }  } = match

  function goToNext(){
    if (parseInt(id) === pages) {
      new M.Toast({html: 'There is no next page', classes: 'red'})
      return false
    }
    return history.push(`/lesson/page/${parseInt(id || 0) + 1}`)
  }
  function goToPrevious(){
    if (!id) {
      new M.Toast({html: 'There is no previous page', classes: 'red'})
      return false
    } else if (parseInt(id) === 1) {
      return history.push(`/lesson`)
    }
    else {
      return history.push(`/lesson/page/${parseInt(id) - 1}`)
    }

  }
  return (
    <div className="row">
      <NavBar color={'light-blue '}/>
      <div
        className="col s12 m4 l3 sidebar "
      >
        <ul>
            <li>
              <NavLink  
                activeClassName="selected" 
                activeStyle={style}
              to='/lesson/page/1'>Page 1</NavLink >
            </li>
            <li>
              <NavLink 
                activeClassName="selected" 
                activeStyle={style}
                to='/lesson/page/2'>Page 2</NavLink >
            </li>
            <li>
              <NavLink 
                activeStyle={style}
                activeClassName="selected" 
                to='/lesson/page/3'>Page 3</NavLink >
            </li>
        </ul>
      </div>
      <Lesson 
        id={id} 
        imageUrl={`/${id}.jpg`}
        caption={`This is for learning lesson ${id}`}
        goToNext={goToNext}
        goToPrevious={goToPrevious}
        />
    </div>
  );
}

export default withRouter(LessonView)
