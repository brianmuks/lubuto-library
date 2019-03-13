import React, { Fragment, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter, Redirect, Link } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
import M from 'materialize-css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import User, { StatsRow } from "./User";
import UserStats from "./UserStats";
import { useLogout } from "../../Accounts/accountsUtils";
import { COL_USER_STATS, COL_Lessons } from "../../../../lib/Collections";
import UserStatsAverage from "./UserStatsAverage";
import UserStatsLessonDetails from "./UserStatsLessonDetails";

// for prototyping
const data = [
  {name: 'Lesson 1', correct_answer: 40, tries: 2, amt: 2400},
  {name: 'Lesson 2', correct_answer: 30, tries: 1, amt: 2210},
  {name: 'Lesson 3', correct_answer: 20, tries: 9, amt: 2290},
  {name: 'Lesson 4', correct_answer: 27, tries: 3, amt: 2000},
  {name: 'Lesson 5', correct_answer: 18, tries: 4, amt: 2181},
  {name: 'Lesson 6', correct_answer: 23, tries: 3, amt: 2500},
  {name: 'Lesson 7', correct_answer: 34, tries: 4, amt: 2100},
];


function UserProfile({ user, stats, history,match }) {
  const { isLoggedOut, logOutUser } = useLogout();

  useEffect(() =>  M.AutoInit())

  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <div className="container">
       <Link to='/users'>
        <h5>Back to users</h5>
       </Link>
        {/* <h4>{user && user.profile.name} </h4> */}
        <h4><code>{"Mary Zulu"} </code> </h4>
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
      */}
        <br />
        <ul id="tabs-swipe-demo" className="tabs">
          <li className="tab col s3"><a className="active" href="#test-swipe-1">Table Data</a></li>
          <li className="tab col s3"><a  href="#test-swipe-2">Graphical Data</a></li>
          <li className="tab col s3"><a  href="#test-swipe-3">Average Data</a></li>
          <li className="tab col s3"><a  href="#test-swipe-4">Lesson Data</a></li>
        </ul>
        <br />
        <br />
        <div id="test-swipe-1" className="col s12">
          <UserStats match={match} children={<StatsRow stats={stats} route={history} />} />
        </div>
        <div id="test-swipe-3" className="col s12">
          <UserStatsAverage match={match} />
        </div>
        <div id="test-swipe-4" className="col s12">
          <UserStatsLessonDetails match={match} />
        </div>
        <div id="test-swipe-2" className="col s12 ">
          <BarChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar onClick={() => history.push('/stats')} dataKey="correct_answer" fill="#8884d8" />
            <Bar dataKey="tries" fill="#82ca9d" />
          </BarChart>
        </div>
        <div>
        </div>
      </div>
    </Fragment>
  );
}

// avoiding chanined wraps of two higher components
const RouterProfile = withRouter(UserProfile);

export default withTracker(props => {
  Meteor.subscribe("user", props.match.params.id);
  Meteor.subscribe("userStats");
  return {
    user: Meteor.users.findOne({ _id: props.match.params.id }),
    stats: COL_USER_STATS.find({ userId: props.match.params.id }).fetch(),
    lessons: COL_Lessons.find({ }).fetch(),
  };
})(RouterProfile);
