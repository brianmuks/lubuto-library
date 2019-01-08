import React, { useState } from "react"
import { Meteor } from "meteor/meteor"
import { withTracker } from "meteor/react-meteor-data"
import User from "./User"
import ReactModal from 'react-modal'
import { Redirect } from 'react-router-dom'
import { useFormInput, useError } from '../Accounts/accountsUtils'
import { useLogout } from '../Accounts/accountsUtils'
import { NavBar } from '../Landing'


const getAllUsers = users => users.length && <User users={users} />;
let index = 0

function Statistics({ users }) {
  const [isOpen, setModal ] = useState(false)
  const [userId, setUserId] = useState('')
  const name = useFormInput('')
  const age = useFormInput('')
  const {error, setError } = useError('')
  const { isLoggedOut, logOutUser } = useLogout()
 
  function checkModal(){
    setModal(!isOpen)
  }

  function saveChanges(){
    Meteor.call('updateUser', userId, name.value, age.value, err => {
      err ? setError(err.reason) : setModal(!isOpen)
    })
  }

  function deleteUser(){
    Meteor.call('removeUser', userId, err => {
      err ? setError(err.reason) : setModal(!isOpen)
    })
  }

  function editUser(e, id){
    setModal(true)
    setUserId(id)
  }

  if(isLoggedOut){
    return <Redirect to='/login'/>
  }
  return (
    <>
    <NavBar logOutUser={logOutUser} color={'light-blue'} /> 
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
            <div className='container'>
              <div className='row'>
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
              <button className='btn red center' onClick={deleteUser}>Delete User</button>
              <button className='btn right' onClick={checkModal}>Close Modal</button>
              <div className='row'>
                  <p className='red-text'>{error}</p>
              </div>
              </div>
            </div>
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
              <User key={user._id} user={user} count={users.length} i={index++} editUser={e => editUser(e, user._id)} />
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
