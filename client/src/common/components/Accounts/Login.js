import React from "react";
import { Link } from 'react-router-dom'
import { useFormInput } from './accountsUtils'


function Login() {
    const email = useFormInput('Email Address')
    const password = useFormInput('Password')
    
    // log the user in 
    function handleLogin(e){
        e.preventDefault()
        
    }
  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> LOGIN</div>
            <form className="col s12" onSubmit={handleLogin}>
              <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="email"
                    type="text"
                    className="validate"
                    {...email}
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s10 " style={{ marginLeft: 15 }}>
                  <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    className="validate"
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login