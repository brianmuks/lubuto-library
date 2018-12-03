import React from "react";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import User from "./User";

const getAllUsers = users => users.length && <User users={users} />;
let index = 0;

function Statistics({ users }) {
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
          {users.map(user => (
            <User key={user._id} user={user} count={users.length} i={index++} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default withTracker(() => {
  Meteor.subscribe("users");
  return {
    users: Meteor.users.find({}).fetch()
  };
})(Statistics);
