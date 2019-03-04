import React from "react";

// we will call the stats here
function UserStats({ children }) {
  return (
    <table className="highlight">
      <thead>
        <tr>
          <th>#</th>
          <th>Lesson Number</th>
          <th>Completed</th>
          <th>Started</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default UserStats;
