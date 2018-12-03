import React from "react";

function UserStats() {
  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>Lesson Number</th>
          <th>Completed</th>
          <th>Started</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
            <td>true</td>
            <td>1/01/01</td>
            <td>10/10/10</td>
        </tr>
        <tr>
            <td>1</td>
            <td>true</td>
            <td>1/01/01</td>
            <td>10/10/10</td>
        </tr>
      </tbody>
    </table>
  );
}

export default UserStats