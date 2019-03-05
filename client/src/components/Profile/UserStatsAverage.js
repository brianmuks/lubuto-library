import React from "react";

// we will call the stats here
function UserStatsAverage({ children }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lessons Taken</th>
          <th>Average Score</th>
          <th>Percentage Score</th>
          <th>Total Time Spent</th>
          <th>Total Tries</th>
        </tr>
      </thead>
      <tbody>
        <Details />
      </tbody>
    </table>
  );
}
function Details(){

  return  <tr>
      <td> # </td>
      <td> 20 </td>
      <td> 10/50 </td>
      <td> 20% </td>
      <td> 20 Hours </td>
      <td> 40 in 20 Lessons </td>
    </tr>
}
export default UserStatsAverage;
