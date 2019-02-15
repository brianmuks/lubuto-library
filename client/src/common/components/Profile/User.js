import React from "react"
import { Link } from "react-router-dom"

function UserRow({ user, editUser, count = 0, i = 0 }) {
  return (
    user && (
      <tr>
        {count > 1 && <td>{i}</td> || count}
        <td>
          <Link to={`/user/${user._id}`}>{user.profile.name}</Link>
        </td>
        <td>{user.profile.age }</td>
        <td>{user.profile.gender } </td>
        <td>{user.profile.center} </td>
        <td onClick={editUser}>Edit</td>
      </tr>
    )
    || null
  )
}

export function StatsRow({stats, route}){
  let count = 1

  function viewDetails(e, id){
    return route.push(`/stats/${id}`)
  }
  return(
    stats.length && stats.map(stat => (
      <tr key={stat._id} onClick={e => viewDetails(e, stat._id)}>
        <td>{count++}</td>
        <td>
        {stat.lessonNumber}
        </td>
        <td>{ stat.isDone && 'Yes' || 'No' }</td>
        <td>{ stat.started.toLocaleString() } </td>
        <td>{ stat.isDone && stat.completed.toLocaleString() || 'Not Yet'} </td>
      </tr>
    ))
    || null
  )
}

export default UserRow;

