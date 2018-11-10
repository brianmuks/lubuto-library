import React from "react";
import { Link } from 'react-router-dom'
import {useFormInput, validatePassword} from './accountsUtils'

function Register({role}) {
    const email = useFormInput('Email Address')
    const password = useFormInput('Password')
    const confirmedPassword = useFormInput('Confirm Password')
    const isValid = validatePassword(password.value, confirmedPassword.value)

    function handleRegister(e){
        e.preventDefault()
        if (!isValid) {
            console.log('Yes I am not valid indeed');
            return;
        }
        // an account will created from here
        
    }

  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> Register</div>
            <form className="col s12" onSubmit={handleRegister}>
              <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="email"
                    type="email"
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
                    required
                    {...password}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s10 " style={{ marginLeft: 15 }}>
                  <input
                    placeholder="Confirm Password"
                    id="confirm-password"
                    type="password"
                    className="validate"
                    name="confirm-password"
                    required
                    {...confirmedPassword}
                  />
                  <label htmlFor="confirm-password">Confirm Password</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field center col s12">
                  <button className="waves-effect waves-light btn">
                    Register
                  </button>
                </div>
              </div>
              {/* The following is only here for prototyping */}
              <div className="row center">
                <div className="input-field col s12">
                    {`This register is for ${role}`}
                </div>
              </div>
              <div className='center row'>
                <Link to='/login'>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}



export default Register