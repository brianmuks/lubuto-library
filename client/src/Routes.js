import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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


// Only here for prototyping
const adminRole = "admin";
const userRole = 'user';

/*
  Admin and User are component that will render other components based on either the role 
  or the authentication of the current user
*/

const Routes = () => (
  <Router>
    <Switch>
      <Admin
        role={adminRole}
        exact
        path="/dashboard/create-lesson"
        component={CreateLesson}
      />
      <Admin
          role={adminRole}
          exact
          path="/dashboard/register"
          render={() => <Register role={adminRole}/>}
      />
      <User exact role={"user"} path="/" component={Landing} />
      <Route path="/add_icons" component={IconEditor} />
      <Route path='/login' component={Login} />
      <Route path='/register' render={() => <Register role={userRole}/>} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
