import React from "react";
import { Link, Redirect } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import {useFormInput, useError, validatePassword} from './accountsUtils'

function Register({role}) {
    const email = useFormInput('')
    const name = useFormInput('')
    const password = useFormInput('')
    const confirmedPassword = useFormInput('')
    const isValid = validatePassword(password.value, confirmedPassword.value)
    const {error, setError} = useError('')

    function handleRegister(e){
        e.preventDefault()
        if (!isValid) {
            setError('There was a problem with the password')
            return;
        }
        const profile = {
          name: name.value,
          createdAt: new Date(),
        }
        const user = {
          email: email.value,
          password: password.value,
          profile,
        }
        Accounts.createUser(user, err => err ? setError(err.reason) : <Redirect to='/' /> )
    }

  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> Register the {role}</div>
            <form className="col s12" onSubmit={handleRegister}>
              <div className="row">
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="name"
                    type="text"
                    className="validate"
                    {...name}
                    required
                  />
                  <label htmlFor="name">Full Name</label>
                </div>
              </div>
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
              <div className='center row'>
                <Link to='/login'>Login</Link>
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
  );
}



export default Register