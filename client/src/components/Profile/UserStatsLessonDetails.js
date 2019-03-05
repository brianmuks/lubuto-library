import React from "react";

// we will call the stats here
function UserStatsLessonDetails({ children }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lesson Number</th>
          <th>Date Started</th>
          <th>Tries</th>
          <th>Time Taken</th>
          <th>Mark</th>
          <th>Langauge</th>
        </tr>
      </thead>
      <tbody>
        <Details />
      </tbody>
    </table>
  );
}


function Details(){
    return <tr>
      <td> # </td>
      <td> 30 </td>
      <td> March 4,2019 </td>
      <td> 5 </td>
      <td> 10 Min </td>
      <td> <i className="material-icons">done</i> </td>
      <td> Cinyanja </td>
    </tr>
}

export default UserStatsLessonDetails;
