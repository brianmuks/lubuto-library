import React from "react";
import { Meteor } from 'meteor/meteor'
import User from './User'

const users = Meteor.users.find().fetch()
function UserProfile() {
  return (
    <div className="container">
      <h4>Olivier JM </h4>
      <table className="highlight">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Center</th>
            </tr>
        </thead>
        <tbody>
            <User users={users}/>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
