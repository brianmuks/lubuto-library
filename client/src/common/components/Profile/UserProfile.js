import React from "react";
import { Meteor } from 'meteor/meteor'
import User from './User'


// to-do: get the data of the currently logged in user
const currentUser = Meteor.user()
const user = [
    {
        name: 'Olivier',
        age: '25',
        sex: 'male',
        center: 'lusaka'
    }
]

function UserProfile() {
  return (
    <div className="container">
      <h4>Olivier JM </h4>
      <table className="highlight">
        <thead>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Center</th>
        </thead>
        <tbody>
            <User users={user}/>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
