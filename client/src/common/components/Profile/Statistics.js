import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from 'meteor/react-meteor-data'
import User from './User'

const getAllUsers = users => users.length && <User users={users} />

function Statistics({users}) {
  return (
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
            </tr>
        </thead>
        <tbody>
         <User users={users} />
        </tbody>
      </table>
    </div>
  );
}


export default withTracker(() => {
    Meteor.subscribe('users')
    return {
        users: Meteor.users.find().fetch()
    }
})(Statistics);
