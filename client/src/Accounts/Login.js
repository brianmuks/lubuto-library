import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import { Meteor } from 'meteor/meteor'
import { useFormInput, useError } from './accountsUtils'
import Footer from "../components/Layout/Footer";
import NavBar from "../components/Layout/NavBar";


function Login() {

    const username = useFormInput('')
    const password = useFormInput('')
    const {error, setError} = useError('')
    const [isAuth, setAuth] = useState(false)
    // log the user in 
    function handleLogin(e){
        e.preventDefault()
        Meteor.loginWithPassword(username.value, password.value, err => {
          err ? setError(err.reason) : location.reload();
        })
    }
    // 
  if (Meteor.userId()){
    return null;
  }  
  return (
    <>
  
    <div className="row ">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card login-container">
          <div className="row  ">
            <div className="col s12 center-align"> <span className="login-title"> Login  </span></div>
            <form className="col s12" onSubmit={handleLogin}>
              <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="username"
                    type="text"
                    className="validate login-input"
                    placeholder="type username"
                    {...username}
                    required
                  />
                  <label className="login-input-label" htmlFor="username">Username</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s10 " style={{ marginLeft: 15 }}>
                  <input
                    id="password"
                    type="password"
                    className="validate login-input"
                    placeholder="type Password"

                    {...password}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s12 center">
                  <button className="waves-effect  waves-light btn">
                    Login
                  </button>
                </div>
              </div>
              <div className='center row'>
                <Link to='/register'>Register</Link>
              </div>
              <div className='center row'>
                <p className='red-text'>
                    {
                      error.length ? error : null 
                    }
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default Login