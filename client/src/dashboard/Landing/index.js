import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { Meteor } from 'meteor/meteor'
import { useLogout } from '../../Accounts/accountsUtils'
import "./landing.css";
import Footer from "../../components/Layout/Footer";
import NavBar from "../../components/Layout/NavBar";

function Landing() {
  const { isLoggedOut, logOutUser } = useLogout()
  
  if(isLoggedOut){
    return <Redirect to='/login'/>
  }
  return (
    <div id="app">
      <header>
        <NavBar />
      </header>

      <main>
        <Fragment>
          <div className="container-fluid"></div>
          <div className="section no-pad-bot" id="index-banner">
            <div className="container">
              <br />
              <br />
              <h1 className="header center text-color"> LubutoLiteracy</h1>
              <div className="row center">
                <h6 className="header col s12 light">
                  High-quality mother-tongue materials to teach children to read
                  on an accessible, low-cost digital platform
                </h6>
              </div>
              <RenderAdminActions />
              <br />
              <br />
            </div>
          </div>

          <div className="container">
            <div className="section">
              <div className="row">
                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text">
                      <Link to="/dashboard/stats">
                        <i className="material-icons medium text-color">
                          flash_on
                        </i>
                      </Link>
                    </h2>
                    <h5 className="center text-color">Collect user data</h5>

                    <p className="light center">
                      Data dashboards allow administrators to view user
                      profiles, including demographic information and location.
                      The system tracks user-level data on cumulative length of
                      time lessons have been used, time spent per lesson,
                      average time spent per lesson, number of attempts made per
                      exercise prior to correct answer (by lesson), and an
                      average percentage score on exercises.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text">
                      <Link to="/dashboard/users">
                        <i className="material-icons medium text-color">
                          group
                        </i>
                      </Link>
                    </h2>
                    <h5 className="center text-color">
                      Self-paced and user-friendly
                    </h5>

                    <p className="light center">
                      Lessons need no supervision of learners as they study.
                      They are designed with gradual progression from learning
                      single vowels to vowel combinations, then simple to
                      complex syllables eventually combined into decodable
                      words, and finally lessons consisting of short reading
                      comprehension texts. Locally-produced images add context,
                      and audio enhancement of the lessons provides the learner
                      with instant feedback.
                    </p>
                  </div>
                </div>

                <div className="col s12 m4">
                  <div className="icon-block">
                    <h2 className="center light-blue-text">
                      <Link to="/dashboard/settings">
                        <i className="material-icons medium text-color">
                          settings{" "}
                        </i>
                      </Link>
                    </h2>
                    <h5 className="center text-color">Open-source</h5>

                    <p className="light center">
                      This software uses React for building user interfaces
                      (UI), with Meteor on the backend and MongoDB for data
                      storage.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <br />
          </div>
        </Fragment>
      </main>
      <Footer />
    </div>
  );
}




function RenderAdminActions(){
//in the path bewlo ?n=[next location from lessons_selector path]
  return (
    <div className="row center">
    <div className=" col m4">
        <Link to="/dashboard/language_selector/?n=dashboard/create_lesson_type">
      <button  className="btn-large waves-effect waves-light button-color" >
      Create Lessons
      </button>
  </Link>
</div>

 <div className=" col m4">
        <Link to="/dashboard/language_selector/?n=dashboard/view_lessons">
      <button  className="btn-large waves-effect waves-light button-color" >
      View Lessons
      </button>
  </Link>
  </div>

      <div className=" col m4">
        <Link to="/dashboard/settings">
          <button className="btn-large waves-effect waves-light button-color" >
            Settings
      </button>
        </Link>
      </div>


</div>
  )

}

export default Landing;
