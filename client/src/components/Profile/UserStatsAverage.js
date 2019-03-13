import React from "react";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { getFilteredLessons, getlessonsGrandTotal } from "./methods";

// we will call the stats here
function UserStatsAverage({ stats }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lessons Taken</th>
          <th>Pages Covered</th>
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
  const filteredStats = gStats[0];
  gStats = gStats[1];
    let count = 0;
    // Map() is hack 
   //NOTE: // filteredStats.length gives wrong length
  filteredStats.map((item, index) => {
      count++;
    })
    console.log(gStats)

  return  <tr>
      <td> # </td>
    <td> {count} </td>
    <td> {stats.length} </td>
      <td> 20% </td>
    <td> {gStats.gTotalTime} </td>
      <td> 40 in 20 Lessons </td>
    </tr>
}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const userId = props.match.params.id;
  const query = { userId };
  return {
    // lessons: COL_Lessons.find(query).fetch(),
    stats: COL_USER_STATS.find(query).fetch(),
  };
})(UserStatsAverage);

