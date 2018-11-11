import React from 'react'
import { Route } from 'react-router-dom'

// This same as Admin routes needs rafactoring
// another way this can be done is check the if the user doesn't have priviledges and route them hom
// this should be logged in too
const User = ({role, ...props}) => role === 'user' &&  (<Route { ...props }/>) 

export default User
