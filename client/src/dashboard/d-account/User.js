import React from "react"
import { Link } from "react-router-dom"

function UserRow({ user, editUser, count = 0, i = 0 }) {
  return (
    user && (
      <tr>
       
        <td>
          <Link to={`/dashboard/user/${user._id}`}>{user.profile.name}</Link>
        </td>
        <td>{user.username || "Male" } </td>
        <td>{user.profile.age || 4 }</td>
        <td>{user.profile.gender || "Male" } </td>
        <td>{user.profile.pwd } </td>
        {/* <td onClick={editUser}>Edit</td> */}
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

