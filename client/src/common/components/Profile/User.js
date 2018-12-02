import React from "react";

function User(props = []) {
  return props.users.map((user, i) => (
    <tr key={i}>
      <td>{user.name}</td>
      <td>{user.age} </td>
      <td>{user.sex} </td>
      <td>{user.center} </td>
    </tr>
  ));
}

export default User;
