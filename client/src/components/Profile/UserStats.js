import React from "react";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { getFilteredLessons } from "./methods";

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

  const details = [
    {lessonNumber:1,progress:"3/20",date:"SEP 20,2018",completed:false},
    {lessonNumber:1,progress:"5/20",date:"May 40,2018",completed:true},
    {lessonNumber:1,progress:"3/20",date:"APR 10,2018",completed:false},
    {lessonNumber:1,progress:"33/50",date:"MAR 20,2018",completed:false},
    {lessonNumber:1,progress:"3/20",date:"DEC 20,2018",completed:false},
    {lessonNumber:1,progress:"3/20",date:"JAN 23,2018",completed:false},
    {lessonNumber:1,progress:"6/10",date:"SEP 20,2018",completed:false},
    {lessonNumber:1,progress:"3/20",date:"NOV 04,2018",completed:false},
    {lessonNumber:1,progress:"9/20",date:"AUG 02,2018",completed:false},
    {lessonNumber:1,progress:"20/20",date:"SEP 20,2018",completed:true},
  ];

  console.log(getFilteredLessons(stats))



  return getFilteredLessons(stats).map((item, index)=>(
    <tr>
      <td> {item.lessonNumber} </td>
      <td> {item.lang} </td>
      <td> {item.progress} </td>
      <td> {item.date} </td>
      <td> {`${item.completed}`} </td>
    </tr>
  ))


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
})(UserStats);


