import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'

// we might need to use the roles package
// or we can just use set it as another field
// this should be refactored


const Admin = ({role, ...props}) => role === 'admin' &&  (<Route { ...props }/>)



// const Admin = (props) => {
//     setTimeout(() => {
//         console.log(Meteor.user())
//     }, 500)

//     if(!Meteor.user()){
//         return null
//     }
//     if(!Meteor.user().role !== 'admin'){
//         // return <Redirect to='/login' />
//         return
//     }
//     return <Route { ...props }/>
// }

export default Admin