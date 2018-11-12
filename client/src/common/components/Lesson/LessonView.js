import React from "react";
import './style.css'
import { NavBar } from '../Landing'

function LessonView() {
  return (
    <div className="row">
      <NavBar />
      <div
        className="col s12 m4 l3 sidebar blue-grey lighten-2"
      >
        <ul>
            <li>Page 1</li>
            <li>Page 2</li>
            <li>Page 3</li>
        </ul>
      </div>

      <div className="col s12 m8 l9 main teal lighten-1">main</div>
    </div>

  );
}

export default LessonView;
