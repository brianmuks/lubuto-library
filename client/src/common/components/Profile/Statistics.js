import React, { useState } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import User from "./User"
// import EditModal from '../Utils'
import ReactModal from 'react-modal'

const getAllUsers = users => users.length && <User users={users} />;
let index = 0

function Statistics({ users }) {
  const [isOpen, setModal ] = useState(false)

  function checkModal(){
    setModal(!isOpen)
  }
  function saveChanges(){
    console.log('Thats me ')
  }
  function editUser(){
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
                  bottom: '20%',
                  right: '20%'
                },
                
              }}
            >
          <button onClick={checkModal}>Close Modal</button>
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
            <User key={user._id} user={user} count={users.length} i={index++} editUser={editUser} />
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
