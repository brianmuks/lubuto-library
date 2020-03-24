import React, { useState } from "react";



function Footer(){

    return (
      <footer className="page-footer white footers">
        <div className="container">
          <div className="row">
            <div className="col l6 s12">
              <h5 className="black-text"></h5>
              <p className="black-text text-lighten-4 ">
                Lubuto Library Partners is an innovative development
                organization that builds the capacity of public libraries to
                create opportunities for equitable education and poverty
                reduction.{" "}
                <a target="_blank" href="http://www.lubuto.org.">
                  Learn More{" "}
                </a>
              </p>
            </div>
            <div className="col l3 s12">
           
            </div>
            <div className="col l3 s12">
           
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          Created by
          <a
            className="black-text"
            href="https://web.facebook.com/manolivier"
            target="_blank"
          >
            <code>{`  OlivierJM    `} </code>
          </a>
          <a> </a>
          <a
            className="black-text"
            href="https://www.linkedin.com/in/brianmuks/"
            target="_blank"
          >
           
            <code> {` | &  BrianMuks with`} ♥</code>
          </a>
          <div className="container"> </div>
        </div>
      </footer>
    );


}

export default Footer