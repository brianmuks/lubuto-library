import React from "react";
import { Link } from 'react-router-dom'

function Tools() {

  return (
    <>
      <ul id="slide-out" className="sidenav  sidenav-fixed">
        <li>
          <div className="user-view ">
          {/* Commented out these for public purposes */}
            {/* <div className="background">
              <img
                className="img-logo"
                src="https://static1.squarespace.com/static/557edb36e4b0c3993dee95d1/t/558172d3e4b07ca0ea5976c1/1541192743311/?format=1500w"
              />
            </div> 
            <Link to='/'>
              <img
                className="circle "
                src="https://avatars1.githubusercontent.com/u/11255454?s=88&v=4"
              />
            </Link>
            {/* <a href="#name">
              <span className="white-text name">LUBUTO LIBRARY</span>
            </a> */}
            <a href="#email">
              <span className="white-text email">olivier@gmail.com</span>
            </a>
          </div>
        </li>
        <li>
          <a href="#!">
            <i className="material-icons">cloud</i>
            First Link With Icon
          </a>
        </li>
        <li>
          <a href="#!">Second Link</a>
        </li>
        <li>
          <div className="divider" />
        </li>
        <li>
          <a className="subheader">Subheader</a>
        </li>
        <li>
          <a className="waves-effect" href="#!">
            Third Link With Waves
          </a>
        </li>
      </ul>
      <a href="#" data-target="slide-out" className="sidenav-trigger">
        <i className="material-icons">menu</i>
      </a>
    </>
  );
}

export default Tools;
