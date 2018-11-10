import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import IconEditor from "./dashboard/tools/iconEditor";
import CreateLesson from "./dashboard/d-lesson/CreateLesson";
import Landing from "./common/components/Landing";

import Admin from "./Routes/Admin";
import User from "./Routes/User";

const role = "admin";

const Routes = () => (
  <Router>
    <Switch>
      {/* <Route exact  path="/" component={Landing} /> */}
      <Admin
        role={role}
        exact
        path="/dashboard/create-lesson"
        component={CreateLesson}
      />
      {/* <Route path="/dashboard/create-lesson" component={CreateLesson} /> */}
      <User exact role={"user"} path="/" component={Landing} />
    </Switch>
  </Router>
);
{
  /* role={'user'} path="/add_icons" component={IconEditor} /> */
}

export default Routes;
