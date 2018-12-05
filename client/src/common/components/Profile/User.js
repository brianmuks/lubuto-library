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

export function StatsRow({stats}){
  let count = 1
  return(
    stats.length && stats.map((stat, i) => (
      <tr key={stat._id}>
        <td>{count++}</td>
        <td>
          <Link to={`/stats/${stat._id}`}>{stat.lessonNumber}</Link>
        </td>
        <td>{stat.isDone && 'Yes' || 'No' }</td>
        <td>{ stat.started.toLocaleString() } </td>
        <td>{ stat.isDone && stat.completed.toLocaleString() || 'Not Yet'} </td>
      </tr>
    ))
    || null
  )
}

export default UserRow;

