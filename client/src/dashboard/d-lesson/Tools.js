import React from "react";
import { Link } from 'react-router-dom'
import { COL_TOOLS } from "../../../../lib/Collections";
import { withTracker } from "meteor/react-meteor-data";



function Tools(props) {

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
          <a href="#!">Tools</a>
        </li>
        <li>
          <div className="divider" />
        </li>
       <RenderTools tools={props.tools} /> 
      </ul>
      
    </>
  );
}


function RenderTools(props){

  return props.tools.map((tools,index)=>(
      <li key={index}>
      <a href="#!">
        <i className="material-icons">{tools.name}</i>
        {tools.label}
      </a>
    </li>
    ));
}



export default withTracker(() => {
  Meteor.subscribe("col_tools");
  return {
    tools: COL_TOOLS.find().fetch()
  };
})(Tools);

