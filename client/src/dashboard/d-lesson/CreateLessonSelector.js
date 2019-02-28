//NOTE holds all create lesson components

import React from "react";
import { NavBar } from "../../common/components/Landing";
import { useLogout } from "../../common/components/Accounts/accountsUtils";
import { getUrlParams } from "../../utilities/Tasks";


// todo: Push the icon name to the icon array, as items that have been moved

function CreateLessonSelector() {

  const { isLoggedOut, logOutUser } = useLogout()

  return (
   <div>
      <NavBar logOutUser={logOutUser} color={'light-blue'} /> 
      <div className='row '>
      <h4 className='center'> Please Select Lesson Type</h4>
      <div className='col m10 offset-m1'>
      <br /><br />
      <RenderOptions />
        </div>
    </div>
   </div>
  );
}



function RenderOptions(){
      // 

  const urlParams = getUrlParams();
  const options = [
    { name: 'Instructional',type:'instr',icon:'border_color',description:'No Exercise , you only impart knwoledge throught use of words,audio and images '},
    { name: 'Drag-N-Drop', type: 'dnd',icon:'event_seat',description:'Create an excercise that allows students to drag the question to the right answer' },
    { name: 'Click-2-Match', type: 'c2m',icon:'mouse',description:'Student click one item and match with the item by clicking on it' }]

  return options.map((item,index)=>(
    <div key={index} className="col s4 ">
      <h4 className="header center">
    <i className="material-icons circle cyan-text big">{item.icon}</i>
      
      {`  ${item.name}`}</h4>
      <div className="card horizontal ">
    
          <div className="card-stacked">
            <div className="card-content">
              <p>{item.description}</p>
            </div>
            <div className="card-action">
            <a className='teal-text fa' href={`/dashboard/create-lesson/new?type=${item.type}&${urlParams}`}>Create </a>
            </div>
          </div>
        </div>
      </div>
  ))

}

export default CreateLessonSelector;
