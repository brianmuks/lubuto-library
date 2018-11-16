import React from "react";
import { Link, withRouter } from 'react-router-dom'
import './style.css'
import { NavBar } from '../Landing'
import Lesson from './Lesson'


function LessonView({match, history}) {
  const { params: { id }  } = match

  // It would be good to know how many pages a lesson has
  function goToNext(){
    return history.push(`/lesson/page/${parseInt(id || 0) + 1}`)
  }
  function goToPrevious(){
    if (!id) {
      console.log('There is no previous page')
      new M.Toast({html: 'There is no previous page'})
      return false
    } else if (parseInt(id) === 1) {
      return history.push(`/lesson`)
    } else {
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
              <Link to='/lesson/page/1'>Page 1</Link>
            </li>
            <li>
              <Link to='/lesson/page/2'>Page 2</Link>
            </li>
            <li>
              <Link to='/lesson/page/3'>Page 3</Link>
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
