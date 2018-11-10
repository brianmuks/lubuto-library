import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// we might need to use the roles package
// or we can just use set it as another field


const User = ({role, ...props}) => {

    return role === 'user' &&  (<Route { ...props }/>) 
    // : (<Redirect to='/' />)
}

export default User
