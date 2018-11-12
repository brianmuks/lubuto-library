import React from "react";
import './style.css'

function LessonView() {
  return (
    <div className="row">
    <div className='col s12'>
    
        <h6 className='center'>
            Header
        </h6>
    </div>
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
