import React from "react";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { getFilteredLessons, getlessonsGrandTotal, formatTime } from "./methods";

// we will call the stats here
function UserStatsAverage({ stats }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lessons Taken</th>
          <th>Pages Covered</th>
          <th> Score</th>
          <th>Percentage Score</th>
          <th>Total Time Spent</th>
          <th>Total Tries</th>
        </tr>
      </thead>
      <tbody>
        <Details stats={stats} />
      </tbody>
    </table>
  );
}
function Details({ stats}){

  let gStats = getlessonsGrandTotal(stats);
  const filteredStats = gStats.filteredLessons;
  let count = Object.keys(filteredStats).length;
                                                //total questions
    const score = gStats.passMark+"/"+Math.floor(gStats.passMark+gStats.failMark)
  const scorePercent = Math.floor((gStats.passMark/(gStats.passMark + gStats.failMark) )*100)
   const questions = Math.abs(gStats.failMark+gStats.passMark);  

  return  <tr>
      <td> # </td>
    <td> {count} </td>
    <td> {stats.length} </td>
      <td> {score} </td>
      <td> {scorePercent+"%"} </td>
    <td> {formatTime(gStats.gTotalTime)} </td>
    <td> {`${gStats.attempts} in ${questions} Questions` } </td>
    </tr>
}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const userId = props.match.params.id;
  const query = userId && { userId } || {};

  return {
    // lessons: COL_Lessons.find(query).fetch(),
    stats: COL_USER_STATS.find(query).fetch(),
  };
})(UserStatsAverage);

