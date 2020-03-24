import React from "react";
import { withRouter, NavLink } from 'react-router-dom'
import './style.css'
import Lesson from './Lesson'
import NavBar from "../Layout/NavBar";

// It would be good to know how many pages a lesson has
// It will be easy since these will be auto-generated
const pages = 4
const style = {
    fontWeight: "bold",
    color: "teal",
}
function LessonView({match, history}) {
  const { params: { id }  } = match
  const parsedId = parseInt(id)
  function goToNext(){
    if (parsedId === pages) {
      new M.Toast({html: 'There is no next page', classes: 'red'})
      return false
    }
    return history.push(`/lesson/page/${(parsedId || 0) + 1}`)
  }
  function goToPrevious(){
    if (!id) {
      new M.Toast({html: 'There is no previous page', classes: 'red'})
      return false
    } else if (parsedId === 1) {
      return history.push(`/lesson`)
    }
    else {
      return history.push(`/lesson/page/${parsedId - 1}`)
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
