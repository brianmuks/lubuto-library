import React, { useState } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import User from "./User"
import ReactModal from 'react-modal'
import { useFormInput } from '../Accounts/accountsUtils'

const getAllUsers = users => users.length && <User users={users} />;
let index = 0

function Statistics({ users }) {
  const [isOpen, setModal ] = useState(false)
  const name = useFormInput('')
  const age = useFormInput('')


  function checkModal(){
    setModal(!isOpen)
  }
  function saveChanges(){
    console.log(name.value, age.value)
  }
  function editUser(e, user){
    console.log(user)
    setModal(true)
  }
  return (
    <>
         <ReactModal 
              isOpen={isOpen}
              contentLabel="Minimal Modal Example"
              ariaHideApp={false}
              style={{
                overlay: {
                  backgroundColor: 'gray'
                },
                content: {
                  color: 'lightsteelblue',
                  top: '20%',
                  left: '20%',
                  bottom: '30%',
                  right: '20%',
                },
                
              }}
            >
            <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="name"
                    type="text"
                    className="validate"
                    {...name}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="number"
                    type="number"
                    className="validate"
                    {...age}
                    required
                  />
                  <label htmlFor="number">Age</label>
                </div>
              </div>
          <button className='btn ' onClick={saveChanges}>Save Changes</button>
          <button className='btn right' onClick={checkModal}>Close Modal</button>
        </ReactModal>
    <div className="container">
      <h4>Users </h4>
      <table className="highlight">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Center</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <User key={user._id} user={user} count={users.length} i={index++} editUser={e => editUser(e, user)} />
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default withTracker(() => {
  Meteor.subscribe("users");
  Meteor.subscribe("userStats");
  return {
    users: Meteor.users.find({}, { sort: { createdAt: -1 } }).fetch()
  }
})(Statistics)
