import React, { useState } from "react";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import {useFormInput, useError, validatePassword} from './accountsUtils'

function Register(props) {
    const email = useFormInput('')
    const name = useFormInput('')
    const password = useFormInput('')
    const confirmedPassword = useFormInput('')
    const age = useFormInput('')
    const isValid = validatePassword(password.value, confirmedPassword.value)
    const {error, setError} = useError('')
    const [isAuth, setAuth] = useState(false)
    const { location: { pathname } } = props
    
    function handleRegister(e){
      e.preventDefault()
      if (!isValid) {
        setError('There was a problem with the password')
        return;
      }
      const profile = {
        name: name.value,
        age: age.value,
        createdAt: new Date(),
        role: pathname === '/dashboard/register' ? 'admin' : 'user'
        }
        const user = {
          email: email.value,
          password: password.value,
          profile,
        }
        Accounts.createUser(user, err => err ? setError(err.reason) : setAuth(true) )
    }
  if(isAuth){
    return <Redirect to='/' />
  }  
  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> Register the {props.role}</div>
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
                <div className="input-field col s10" style={{ marginLeft: 15 }}>
                  <input
                    id="number"
                    type="number"
                    className="validate"
                    {...age}
                    required
                  />
                  <label htmlFor="number">Age</label>
                </div>
              </div>
              <div className="input-field col s10">
                <select>
                  <option value="" disabled defaultSelected>Choose your gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                <label>Gender</label>
              </div>

              <div className="row">
                <div className="input-field col s10 " style={{ marginLeft: 15 }}>
                  <input
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



export default withRouter(Register)