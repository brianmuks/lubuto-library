import React from "react";

// we will call the stats here
function UserStats({ children }) {
  return (
    <table className="highlight striped centered responsive-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Lesson Number</th>
          <th>Progress</th>
          <th>Date Started</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>

        <Details />

      </tbody>
    </table>
  );
}


function Details(){

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

  return details.map((item, index)=>(
    <tr>
      <td> {index+1} </td>
      <td> {index*2 } </td>
      <td> {item.progress} </td>
      <td> {item.date} </td>
      <td> {`${item.completed}`} </td>
    </tr>
  ))


}

export default UserStats;
