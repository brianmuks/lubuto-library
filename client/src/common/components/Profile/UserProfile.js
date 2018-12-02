import React from "react";
import User from './User'

const users = [
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
            <User users={users}/>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
