import React from "react";
import { Meteor } from "meteor/meteor";
import { withRouter } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data'
import User, { StatsRow } from "./User";
import { USER_STATS } from '../../../../../lib/Collections'
import UserStats from './UserStats'

function UserProfile({ user, stats, history }) {
  console.log(history)
  return (
    <div className="container">
      <h4>{user && user.profile.name } </h4>
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
      {/* 
        we will use breaks for now
      */
     }
      <br />
      <br />
      <br />
      <div>
          <UserStats children={<StatsRow stats={stats} route={history} />}/>
      </div>
    </div>
  );
}

// avoiding chanined wraps of two higher components
const RouterProfile =  withRouter(UserProfile); 

export default withTracker(props => {
    Meteor.subscribe('user', props.match.params.id)
    Meteor.subscribe('userStats')
    return {
        user: Meteor.users.findOne({_id: props.match.params.id}),
        stats: USER_STATS.find({userId: props.match.params.id}).fetch(),
        // stats: USER_STATS.find({}).fetch(),
    }
})(RouterProfile)