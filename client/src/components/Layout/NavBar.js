import React, { useState } from "react";
import { useLogout } from "../../Accounts/accountsUtils";
import { Link, Redirect } from "react-router-dom";






 function NavBar({color}){

     const { isLoggedOut, logOutUser } = useLogout()

  return(
    <nav className={`${color} lighten-1 container-fluid`} role="navigation">
      <div className="nav-wrapper">
        <Link to="/">
          <span id="logo-container"  className="brand-logo">
            {/* removed for brevity */}
            Libra
          </span>
        </Link>
        <ul className="right hide-on-med-and-down">
          <li >
            <span className={`btn ${color}`} onClick={logOutUser}>
              {Meteor.userId() ? 'Logout' : 'Login'}
          </span>
          </li>
          <li>
            <Link to="/users">
              Dashboard
            </Link>
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
  )
}

export default NavBar;