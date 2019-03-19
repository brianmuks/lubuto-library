import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Meteor } from 'meteor/meteor'
import IconEditor from "./dashboard/tools/iconEditor";
import CreateLesson from "./dashboard/d-lesson/CreateLesson";
import NotFound from './components/NotFound'
// Containers (Roles)
import Admin from "./Routes/Admin";
import User from "./Routes/User";
// Accounts
import Login from './Accounts/Login'
import Register from './Accounts/Register'
import UserProfile from './dashboard/d-statistics/UserProfile'
import Users from './dashboard/d-account/Users'
import LessonStats from './dashboard/d-statistics/'
// Lessons
import LessonView from './components/Lesson/LessonView'
import LessonPreview from "./dashboard/d-lesson//LessonPreview";
import StudentLesson from "./student/s-lesson";
import CreateLessonSelector from "./dashboard/d-lesson/CreateLessonSelector";
import LanguageSelector from "./components/LanguageSelector";
import ViewLessons from "./dashboard/d-lesson/ViewLessons";
import EditLesson from "./dashboard/d-lesson/EditLesson";
import Home from "./student/Home";
import ViewLessonPages from "./dashboard/d-lesson/ViewLessonPages";
import Landing from "./dashboard/Landing";
import Settings from "./dashboard/Settings";

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
          path="/dashboard/language_selector"
          component={LanguageSelector}
      />

      <Route
        exact
        path="/dashboard/settings"
        component={Settings}
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
      <Route
      exact
      path="/dashboard/view_lessons/"
      component={ViewLessons}
      
    />
      <Route
      exact
      path="/dashboard/view_lesson_pages/"
      component={ViewLessonPages}
      
    />

    <Route
      exact
      path="/dashboard/edit_lesson/:id"
      component={EditLesson}
    />

      <User exact role={"user"} path="/" component={Home} />
      <User exact role={"user"} path="/lessons" component={StudentLesson} />
      <User exact role={"user"} path="/lesson/page/:id" component={LessonView} />
      <User exact role={"user"} path="/language_selector" component={LanguageSelector} />

      <Route path="/add_icons" component={IconEditor} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={() => <Register role={userRole}/>} />

      <Route path='/dashboard/user/:id' component={UserProfile} />
      <Route path='/dashboard/users/' component={Users} />
      <Route path='/dashboard/stats' component={LessonStats} />
      <Route path='/dashboard/lesson_prev' component={LessonPreview} />
  
  
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
