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
import UserProfile from './common/components/Profile/UserProfile'
import Statistics from './common/components/Profile/Statistics'
import LessonStats from './common/components/Profile/LessonStats'

// Lessons
import LessonView from './common/components/Lesson/LessonView'
import LessonPreview from "./dashboard/d-lesson//LessonPreview";
import StudentLesson from "./student/s-lesson";
import CreateLessonSelector from "./dashboard/d-lesson/CreateLessonSelector";


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
        path="/dashboard/create-lesson/:id"
        component={CreateLesson}
      />
      <Route
          exact
          path="/dashboard/register"
          component={() => <Register role={adminRole}/>}
      />

      <Route
        exact
        path="/dashboard/"
        component={Landing}
      />
      <Route
        exact
        path="/dashboard/create_lesson_type"
        component={CreateLessonSelector}
      />


      <User exact role={"user"} path="/" component={Landing} />
      <User exact role={"user"} path="/lesson" component={StudentLesson} />
      <User exact role={"user"} path="/lesson/page/:id" component={LessonView} />
      
      <Route path="/add_icons" component={IconEditor} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={() => <Register role={userRole}/>} />

      <Route path='/user/:id' component={UserProfile} />
      <Route path='/users/:id' component={Statistics} />
      <Route path='/users/' component={Statistics} /> {/* in case there is no specified center */  }
      <Route path='/stats' component={LessonStats} />
      <Route path='/dashboard/lesson_prev' component={LessonPreview} />
  
  
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
