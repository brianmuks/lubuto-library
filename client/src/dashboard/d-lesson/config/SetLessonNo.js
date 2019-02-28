import React from "react";


function SetLessonNo({ _setLessonNumber, lessonNumber }){
    return (
            <div className=" col m12 lesson-number-config">
            <div className="input-field inline right">
                <input defaultValue={lessonNumber} onChange={_setLessonNumber} id="lesson-number" type="number" className="validate" />
                        <label htmlFor="lesson-number">Lesson Number</label>
          </div>
                </div>
    )
}

export default SetLessonNo;