import React, { Component, Fragment } from "react";

export default class LessonView extends Component {
  render() {
    return (
      <Fragment>
        <div className="row">
          <div
            className="col s12 m4 l3 sidebar"
          >
             <div className="collection">
                <a href="/1" className="collection-item">Page 1</a>
                <a href="/2" className="collection-item active">Page 2</a>
                <a href="/3" className="collection-item">Page 3</a>
                <a href="/4" className="collection-item">Page 4</a>
            </div>
          </div>
          <div className="col s12 m8 l9 main teal lighten-1">main</div>
        </div>

      </Fragment>
    );
  }
}
