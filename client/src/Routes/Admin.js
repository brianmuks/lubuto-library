import React from 'react'
import { Route } from 'react-router-dom'

// we might need to use the roles package
// or we can just use set it as another field
// this should be refactored


const Admin = ({role, ...props}) => role === 'admin' &&  (<Route { ...props }/>)

export default Admin