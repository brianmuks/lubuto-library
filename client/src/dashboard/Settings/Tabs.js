import React, { Fragment } from "react";
import Centre from "./Centre";
import Language from "./Language";
import IconEditor from "../tools/IconEditor";
import Sync from "./Sync";

function Tabs() {
    return (
      <Fragment>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3">
                <a href="#test1">Locations</a>
              </li>
              <li className="tab col s3">
                <a href="#test2">Language</a>
              </li>
              <li className="tab col s3 ">
                <a href="#test3">Tool Icons</a>
              </li>
              <li className="tab col s3">
                <a className="active" href="#test4">
                  Sync
                </a>
              </li>
            </ul>
          </div>
          <div id="test1" className="col s12">
            <Centre />
          </div>
          <div id="test2" className="col s12">
            <Language />
          </div>
          <div id="test3" className="col s12">
            <IconEditor />
          </div>
          <div id="test4" className="col s12">
            <Sync />
          </div>
        </div>
      </Fragment>
    );

}

export default Tabs;