import React,{useEffect,useState} from "react";
import { COL_USER_STATS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";
import { getFilteredLessons, getlessonsGrandTotal, formatTime, exportStats } from "./methods";
import { Session } from 'meteor/session'
import { FILTERED_LESSONS } from "../d-redux/constants";
// we will call the stats here
function UsersStatsAverage({ gStats, onLessonsSet,pages }) {

  if (!gStats) {
    return null;
  }

  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lessons Taken</th>
          <th>Students</th>
          <th>Pages Covered</th>
          <th>Total Time Spent</th>
          <th>Total Tries</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <Details onLessonsSet={onLessonsSet} pages={pages} gStats={gStats} />
      </tbody>
    </table>
  );
}
function Details({ gStats,pages}){
  
  const students = Object.keys(gStats.students).length;
  const filteredStats = gStats.filteredLessons;
  
  let lessons = Object.keys(filteredStats).length;
   const questions = Math.abs(gStats.failMark+gStats.passMark);  
 
  const score = gStats.passMark + "/" + Math.floor(gStats.passMark + gStats.failMark)
  const scorePercent = Math.floor((gStats.passMark / (gStats.passMark + gStats.failMark)) * 100)

  console.log(gStats.passMark , gStats.failMark)
  const time = gStats.gTotalTime;
  const attempts = gStats.attempts;
  return <>
    <tr>
      <td> # </td>
      <td> {lessons} </td>
      <td> {students} </td>
      <td> {pages} </td>
      <td> {formatTime(time)} </td>
      <td> {`${attempts} in ${questions} Questions`} </td>
      <td> {score} </td>
   
    </tr>

    <tr rowSpan={4}>
      <td  ><p className="center">  AVERAGE DATA </p>   </td>
  </tr>
    <GetAverageStats
     lessons={lessons} 
     students={students}
     questions={questions}
     pages={pages}
     time={time}
     scorePercent={scorePercent}
     attempts={attempts}
      />
    </>
}

function GetAverageStats ({lessons,students,questions,pages,time,attempts,scorePercent}){

  pages = Math.floor(pages/students);
  attempts = Math.floor(attempts/students);
  questions = Math.floor(questions/students);
  lessons = Math.floor(lessons/students);
  time = formatTime(Math.floor(time / students));

  const onExport = e=>{
    exportStats({ pages, students, attempts, questions, lessons, time, scorePercent});
  }

  return <tr>
    <td onClick={onExport}> # </td>
    <td> {lessons} </td>
    <td> {students} </td>
    <td> {pages} </td>
    <td> {time} </td>
    <td> {`${attempts} in ${questions} Questions`} </td>
    <td> {scorePercent + "%"} </td>
  
  </tr>

}

export default withTracker((props) => {
  Meteor.subscribe("col_tools");
  Meteor.subscribe("users");

  return {
    // lessons: COL_Lessons.find(query).fetch(),
    // stats: COL_USER_STATS.find({}).fetch(),
  };
})(UsersStatsAverage);

