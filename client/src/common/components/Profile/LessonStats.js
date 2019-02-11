import React, { Fragment } from "react";
import { Meteor } from "meteor/meteor";
import { withRouter, Redirect } from "react-router-dom";
import { withTracker } from "meteor/react-meteor-data";
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
import { USER_STATS } from "../../../../../lib/Collections";
import UserStats from "./UserStats";
import { useLogout } from "../Accounts/accountsUtils";
import { NavBar } from "../Landing";

const data = [
  {name: 'Page 1', time_taken: 40, tries: 2, amt: 2400},
  {name: 'Page 2', time_taken: 30, tries: 1, amt: 2210},
  {name: 'Page 3', time_taken: 20, tries: 9, amt: 2290},
  {name: 'Page 4', time_taken: 27, tries: 3, amt: 2000},
  {name: 'Page 5', time_taken: 18, tries: 4, amt: 2181},
];


function LessonStats({ user, stats, history }) {
  const { isLoggedOut, logOutUser } = useLogout();
  if (isLoggedOut) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <NavBar logOutUser={logOutUser} color={"light-blue"} />
      <div className="container">
        <h4>Lesson 1</h4>
        <table className="highlight">
          <thead>
            <tr>
              <th>Lesson</th>
              <th>Pages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>Lesson 1</td>
                <td>5</td>
            </tr>
          </tbody>
        </table>
        {/* 
        we will use breaks for now
      */}
        <br />
        <br />
        <br />
        <div>
          {/* <UserStats children={<StatsRow stats={stats} route={history} />}/> */}
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
            <Bar dataKey="time_taken" fill="#8884d8" />
            <Bar dataKey="tries" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </Fragment>
  );
}

// avoiding chanined wraps of two higher components
const RouterProfile = withRouter(LessonStats);

export default withTracker(props => {
  Meteor.subscribe("user", props.match.params.id);
  Meteor.subscribe("userStats");
  return {
    user: Meteor.users.findOne({ _id: props.match.params.id }),
    stats: USER_STATS.find({ userId: props.match.params.id }).fetch()
  };
})(RouterProfile);
