import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data'
import User from "./User";

function UserProfile({ user }) {
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
          <User user={user} />
        </tbody>
      </table>
    </div>
  );
}

// avoiding chanined wraps of two higher components
const RouterProfile =  withRouter(UserProfile); 

export default withTracker(props => {
    Meteor.subscribe('user', props.match.params.id)
    return {
        user: Meteor.users.findOne({_id: props.match.params.id})
    }
})(RouterProfile)