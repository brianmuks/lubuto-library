//NOTE holds all create lesson components

import React from "react";
import { NavBar } from "../../common/components/Landing";
import { useLogout } from "../../common/components/Accounts/accountsUtils";


// todo: Push the icon name to the icon array, as items that have been moved

function CreateLessonSelector() {

  const { isLoggedOut, logOutUser } = useLogout()

  return (
   <div>
      <NavBar logOutUser={logOutUser} color={'light-blue'} /> 

      <div className='row '>
      <h4 className='center'> Please Select Lesson Type</h4>
      <div className='col m10'>
      <RenderOptions />
        </div>
    </div>


   </div>
  );
}



function RenderOptions(){

  const options = [
    { name: 'Instructional',type:'instr' }, 
    { name: 'Exercise', type: 'exe' },
    { name: 'Multiple Choice', type: 'mltp' }]

  return options.map((item,index)=>(
    <div key={index} className="col s4 ">
      <h2 className="header">{item.name}</h2>
      <div className="card horizontal ">
        <div className="card-image">
          <img src="https://lorempixel.com/100/190/nature/6" />
      </div>
          <div className="card-stacked">
            <div className="card-content">
              <p>I am a very simple card. I am good at containing small bits of information.</p>
            </div>
            <div className="card-action">
            <a className='teal-text fa' href={`/dashboard/create-lesson/${item.type}`}>Create </a>
            </div>
          </div>
        </div>
      </div>
  ))

}



export default CreateLessonSelector;
