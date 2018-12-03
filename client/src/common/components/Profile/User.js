import React from "react";
import { Link } from "react-router-dom";

function UserRow({ user, count = 0, i = 0 }) {
  return (
    user && (
      <tr>
        {count > 1 && <td>{i}</td>}
        <td>
          <Link to={`/user/${user._id}`}>{user.profile.name}</Link>
        </td>
        <td>{user.profile.age }</td>
        <td>{user.profile.gender } </td>
        <td>{user.profile.center} </td>
      </tr>
    )
    || null
  );
}

export default UserRow;
