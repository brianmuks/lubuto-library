import React from "react";

function User(props = []) {
  return props.users.map((user, i) => (
    <tr key={i}>
      <td>{i}</td>
      <td>{user.profile.name}</td>
      <td>{user.profile.age || ''} </td>
      <td>{user.profile.sex || ''} </td>
      <td>{user.profile.center || ''} </td>
    </tr>
  ));
}

export default User;
