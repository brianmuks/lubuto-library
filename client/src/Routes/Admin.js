import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";

import { checkUserRole } from '../common/components/Accounts/accountsUtils'

// we might need to use the roles package
// or we can just use set it as another field
// this should be refactored

// const Admin = ({role, ...props}) => role === 'admin' &&  (<Route { ...props }/>)

function Admin(props) {
  const [isAdmin, setRole] = useState(true);

  useMount(() => {
    const user = checkUserRole();
    if (user !== "admin") {
      setRole(false);
    }
  });
  if (!isAdmin) {
    return <Redirect to="/" />;
  }
  return <Route { ...props }/>

}

function useMount(callback) {
  useEffect(callback, []);
}
export default Admin;
