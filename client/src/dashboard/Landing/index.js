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
    <>
    <header>
      <NavBar />
    </header>

    <main>
  <Fragment>
    <div className="container-fluid">
    
    </div>
    <div className="section no-pad-bot" id="index-banner">
      <div className="container">
        <br />
        <br />
        <h1 className="header center orange-text">Modern Lessons</h1>
        <div className="row center">
          <h5 className="header col s12 light">
            Libraries transforming Africa's next generation
          </h5>
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
                      <Link to="/dashboard/users">

                        <i className="material-icons medium">flash_on</i>
                      </Link>
                    </h2>
                    <h5 className="center">capture User Stats</h5>

                    <p className="light center">
                      By utilizing elements and principles of Material Design, we were
                      able to create a framework that incorporates components and
                      animations that provide more feedback to users. Additionally, a
                      single underlying responsive system across all platforms allow
                      for a more unified user experience.
              </p>
                  </div>
                </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text">
                  <Link to="/dashboard/users">

                <i className="material-icons medium">group</i>
                </Link>
              </h2>
              <h5 className="center">User Experience Focused</h5>

              <p className="light center">
                By utilizing elements and principles of Material Design, we were
                able to create a framework that incorporates components and
                animations that provide more feedback to users. Additionally, a
                single underlying responsive system across all platforms allow
                for a more unified user experience.
              </p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text">
                  <Link to="/dashboard/settings">
                  <i className="material-icons medium">settings </i>
                  </Link>
              </h2>
              <h5 className="center">Easy to work with</h5>

              <p className="light center">
                We will provided detailed documentation as well as specific code
                examples to help new users get started. We are also always open
                to feedback and can answer any questions a user may have about
                Materialize.
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

  </>
)
}




function RenderAdminActions(){
//in the path bewlo ?n=[next location from lessons_selector path]
  return (
    <div className="row center">
    <div className=" col m4">
        <Link to="/dashboard/language_selector/?n=dashboard/create_lesson_type">
      <button  className="btn-large waves-effect waves-light blue" >
      Create Lessons
      </button>
  </Link>
</div>

 <div className=" col m4">
        <Link to="/dashboard/language_selector/?n=dashboard/view_lessons">
      <button  className="btn-large waves-effect waves-light blue" >
      View Lessons
      </button>
  </Link>
  </div>

      <div className=" col m4">
        <Link to="/dashboard/settings">
          <button className="btn-large waves-effect waves-light blue" >
            Settings
      </button>
        </Link>
      </div>


</div>
  )

}

export default Landing;
