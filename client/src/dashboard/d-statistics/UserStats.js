import React from "react";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { getFilteredLessons, getProgress } from "./methods";

// we will call the stats here
function UserStats({ children, stats }) {
  return (
    <table className=" striped centered responsive-table">
      <thead>
        <tr>
          <th>Lesson Number</th>
          <th>Language</th>
          <th>Progress</th>
          <th>Date Started</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <Details stats={stats} />
      </tbody>
    </table>
  );
}

function Details({stats}){

  return getFilteredLessons(stats).map((item, index)=>{
  
    const progress = getProgress({pages:item.pages,lang:item.lang,lessonNumber:item.lessonNumber}) ; 
    
  return  <tr>
      <td> {item.lessonNumber} </td>
      <td> {item.lang} </td>
    <td> {progress.allPages +'/'+ item.pages} </td>
    <td> {new Date(item.createdAt).toDateString()} </td>
    <td> {`${item.completed}`} </td>
    </tr>

})


}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");
  const userId = props.match.params.id;
  const query = userId && { userId } ||{};
  return {
    // lessons: COL_Lessons.find(query).fetch(),
    stats: COL_USER_STATS.find(query).fetch(),
  };
})(UserStats);


