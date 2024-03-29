import React, { useState } from "react";
import { useLogout } from "../../Accounts/accountsUtils";
import { Link, Redirect } from "react-router-dom";

 function NavBar({color}){

     const { isLoggedOut, logOutUser } = useLogout()
  return (
    <nav className={`nav-color lighten-1 container-fluid`} role="navigation">
      <div className="nav-wrapper ">
        <Link to="/" className="">
          <span id="" className="brand-logo logo ">
           
          </span>
        </Link>
        <Link to="/" className="">
          <span id="" className="brand-logo nav-bkg ">
            
          </span>
        </Link>
        <Link to="/" className="">
          <span id="logo-container" className="brand-logo center black-text ">
            {`LubutoLiteracy: Learn to Read in Zambia's 7 Major Languages`}
          </span>
        </Link>
        <ul className="right hide-on-med-and-down">
          <AdminLinks />
          <li className="pointer t-center col left ">
            <span className={`white-text`} onClick={logOutUser}>
              {Meteor.userId() ? `Logout  ` : "Login"}
            </span>
          </li>
        </ul>
        <ul id="nav-mobile" className="sidenav">
          <li>
            <a href="#">Navbar Link</a>
          </li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger">
          <i className="material-icons">menu</i>
        </a>
      </div>
    </nav>
  );
}


function AdminLinks(){

  // alert(Meteor.userId() && Meteor.user().profile.role)

  if (location.pathname.indexOf('dashboard') === -1) {
    return null;
  }
return (

  <>
    <li>
      <Link to="/dashboard">
        Dashboard
            </Link>
    </li>
    <li>
      <Link to="/dashboard/users">
        Users
            </Link>
    </li>

    <li>
      <Link to="/dashboard/stats">
        Statistics
            </Link>
    </li>

  </>



)


}

export default NavBar;