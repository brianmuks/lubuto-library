import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import IconEditor from "./dashboard/tools/iconEditor";
import CreateLesson from "./dashboard/d-lesson/CreateLesson";
import NotFound from "./components/NotFound";
// Containers (Roles)
import Admin from "./Routes/Admin";
import User from "./Routes/User";
// Accounts
<<<<<<< HEAD
import Login from "./Accounts/Login";
import Register from "./Accounts/Register";
import UserProfile from "./components/Profile/UserProfile";
import Statistics from "./components/Profile/Statistics";
import LessonStats from "./components/Profile/LessonStats";

=======
import Login from './Accounts/Login'
import Register from './Accounts/Register'
import UserProfile from './dashboard/d-statistics/UserProfile'
import Users from './dashboard/d-account/Users'
import LessonStats from './dashboard/d-statistics/'
>>>>>>> 16f5092eba75a987140ac1d9b204e8a2eb2e619b
// Lessons
import LessonView from "./components/Lesson/LessonView";
import LessonPreview from "./dashboard/d-lesson//LessonPreview";
import StudentLesson from "./student/s-lesson";
import CreateLessonSelector from "./dashboard/d-lesson/CreateLessonSelector";
import LanguageSelector from "./components/LanguageSelector";
import ViewLessons from "./dashboard/d-lesson/ViewLessons";
import EditLesson from "./dashboard/d-lesson/EditLesson";
import Home from "./student/Home";
import Landing from "./components/Landing";

// Only here for prototyping
const adminRole = "admin";
const userRole = "user";

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
        component={() => <Register role={adminRole} />}
      />
      <Route
        exact
        path="/dashboard/language_selector"
        component={LanguageSelector}
      />
      <Route exact path="/dashboard/" component={Landing} />
      <Route
        exact
        path="/dashboard/create_lesson_type"
        component={CreateLessonSelector}
      />
      <Route exact path="/dashboard/view_lessons/" component={ViewLessons} />
      <Route exact path="/dashboard/edit_lesson/:id" component={EditLesson} />
      <User exact role={"user"} path="/" component={Home} />
      <User exact role={"user"} path="/lessons" component={StudentLesson} />
      <User
        exact
        role={"user"}
        path="/lesson/page/:id"
        component={LessonView}
      />
      <User
        exact
        role={"user"}
        path="/language_selector"
        component={LanguageSelector}
      />
      <Route path="/add_icons" component={IconEditor} />
<<<<<<< HEAD
      <Route path="/login" component={Login} />
      <Route path="/register" component={() => <Register role={userRole} />} />
      <Route path="/user/:id" component={UserProfile} />
      <Route path="/users/:id" component={Statistics} />
      <Route path="/users/" component={Statistics} />{" "}
      {/* in case there is no specified center */}
      <Route path="/stats" component={LessonStats} />
      <Route path="/dashboard/lesson_prev" component={LessonPreview} />
=======
      <Route path='/login' component={Login} />
      <Route path='/register' component={() => <Register role={userRole}/>} />

      <Route path='/dashboard/user/:id' component={UserProfile} />
      <Route path='/dashboard/users/' component={Users} />
      <Route path='/dashboard/stats' component={LessonStats} />
      <Route path='/dashboard/lesson_prev' component={LessonPreview} />
  
  
>>>>>>> 16f5092eba75a987140ac1d9b204e8a2eb2e619b
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
