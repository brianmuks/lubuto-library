import React from "react";
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="section no-pad-bot" id="index-banner">
    <div className="container">
      <br />
      <br />
      <h1 className="header center orange-text">
        Oooops This page was not found{" "}
      </h1>
      <h4 className='center'>😞 😞 😞</h4>
      <div className="row center">
        <h5 className="header col s12 light">
          You have come to the end of all our pages, kindly go back
        </h5>
      </div>
      <div className="row center">
        <Link to="/">
          <button className="btn-large waves-effect waves-light orange">
            Go Home
          </button>
        </Link>
      </div>

      <br />
      <br />
    </div>
  </div>
);

export default NotFound;
