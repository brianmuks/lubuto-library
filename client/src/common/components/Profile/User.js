import React from "react";
import { Redirect, Link } from "react-router-dom";

function User({ users = [] }) {
  return users.map((user, i) => (
    <tr key={i}>
      <td>{i}</td>
      <td>
        <Link to={`/user/${user._id}`}>{user.profile.name}</Link>
      </td>
      <td>{user.profile.age || ""} </td>
      <td>{user.profile.gender || ""} </td>
      <td>{user.profile.center || ""} </td>
    </tr>
  ));
}

export default User;
