import React from "react";

function UserProfile() {
  return (
    <div className="container">
      <h4>Olivier JM </h4>
      <table className="highlight">
        <thead>
          <th>Name</th>
          <th>Age</th>
          <th>Sex</th>
          <th>Center</th>
        </thead>
        <tbody>
          <tr>
            <td>Olivier JM</td>
            <td>25 </td>
            <td>Male </td>
            <td>Lusaka </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserProfile;
