import React from "react";


function SetLessonPageNo({ setLessonPageNumber, lessonPageNumber }){
    return (
            <div className="input-field inline right">
            <input defaultValue={lessonPageNumber} onChange={setLessonPageNumber} id="lesson-number" type="number" className="validate" />
                        <label htmlFor="lesson-number">Lesson page Number</label>
          </div>
    )
}

export default SetLessonPageNo;