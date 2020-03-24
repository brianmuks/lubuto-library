import React from "react";


function SetLessonNo({ setLessonNumber, lessonNumber }){
    return (
            <div className="input-field inline right">
                <input defaultValue={lessonNumber} onChange={setLessonNumber} id="lesson-number" type="number" className="validate" />
                        <label htmlFor="lesson-number">Lesson Number</label>
          </div>
    )
}

export default SetLessonNo;