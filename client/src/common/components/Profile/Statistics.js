import React from "react";
import User from './User'

const users = [
    {
        name: 'Olivier',
        age: '25',
        sex: 'male',
        center: 'lusaka'
    },
    {
        name: 'Jean',
        age: '25',
        sex: 'male',
        center: 'lusaka'
    },
    {
        name: 'Mani',
        age: '25',
        sex: 'male',
        center: 'lusaka'
    },
    {
        name: 'Michael',
        age: '25',
        sex: 'male',
        center: 'lusaka'
    }
]

function Statistics() {
  return (
    <div className="container">
      <h4>Users </h4>
      <table className="highlight">
        <thead>
            <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Sex</th>
                <th>Center</th>
            </tr>
        </thead>
        <tbody>
         <User users={users} />
        </tbody>
      </table>
    </div>
  );
}

export default Statistics;
