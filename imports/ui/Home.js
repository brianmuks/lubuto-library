import React, { Component } from 'react';

export default class Slides extends Component {

  render() {
    return (
      <div className="row ">
        <h1 className="center"> Lubuto-Library E-Learning System</h1>

        <a href='/new_lesson'>
          <div className="col s12 m4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Create Lessons</span>
                <p>
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
              </p>
              </div>
              <div className="card-action">

              </div>
            </div>
          </div>
        </a>

        <a href='/reading_lesson'>

          <div className="col s12 m4">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title">Student Analytics</span>
                <p>
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
                  lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
              </p>
              </div>
              <div className="card-action">

              </div>
            </div>
          </div>
        </a>

      </div>
    )
  }



}
