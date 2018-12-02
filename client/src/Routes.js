import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Meteor } from 'meteor/meteor'
import IconEditor from "./dashboard/tools/iconEditor";
import CreateLesson from "./dashboard/d-lesson/CreateLesson";
import Landing from "./common/components/Landing";
import NotFound from './common/components/NotFound'

// Containers (Roles)
import Admin from "./Routes/Admin";
import User from "./Routes/User";
// Accounts
import Login from './common/components/Accounts/Login'
import Register from './common/components/Accounts/Register'

// Lessons
import LessonView from './common/components/Lesson/LessonView'
import UserProfile from './common/components/Profile/UserProfile'


// Only here for prototyping
const adminRole = "admin";
const userRole = 'user';

/*
  Admin and User are component that will component other components based on either the role 
  or the authentication of the current user
*/

const Routes = () => (
  <Router>
    <Switch>
      <Route
        // role={adminRole}
        exact
        path="/dashboard/create-lesson"
        component={CreateLesson}
      />
      <Route
          exact
          path="/dashboard/register"
          component={() => <Register role={adminRole}/>}
      />
      <User exact role={"user"} path="/" component={Landing} />
      <User exact role={"user"} path="/lesson" component={LessonView} />
      <User exact role={"user"} path="/lesson/page/:id" component={LessonView} />
      
      <Route path="/add_icons" component={IconEditor} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={() => <Register role={userRole}/>} />
      <Route path='/user/:id' component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
