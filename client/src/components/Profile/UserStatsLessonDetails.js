import React from "react";
import { withTracker } from "meteor/react-meteor-data";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { getAttempts, getProgress, getPassStatus, formatTime } from "./methods";

// we will call the stats here
function UserStatsLessonDetails({ pages }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Page Number</th>
          <th>Date Started</th>
          <th>Tries</th>
          <th>Time Taken</th>
          <th>Mark</th>
          <th>Langauge</th>
        </tr>
      </thead>
      <tbody>
        <Details pages={pages} />
      </tbody>
    </table>
  );
}


function Details({pages}){
  return pages.map((item,index) =>{
    const attempts = getAttempts(item.question);
    const isMark = getPassStatus(item.question); 

    return (
      <tr key={index}>
        <td> {index+1} </td>
        <td> {item.lessonPageNumber} </td>
        <td> {new Date(item.createdAt).toDateString()} </td>
        <td> {attempts.attempts + `[${attempts.questions}]`} </td>
        <td> {formatTime(item.time)} </td>
        <td> {
          isMark && <i className="material-icons">done</i>
          || "X" 
        }  </td>
        <td> {item.lang} </td>
      </tr>
    )

  })
}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const userId = props.match.params.id;
  const query = { userId, lang: 'kao',lessonNumber:1};
  return {
    // lessons: COL_Lessons.find(query).fetch(),
    pages: COL_USER_STATS.find(query).fetch(),
  };
})(UserStatsLessonDetails);


