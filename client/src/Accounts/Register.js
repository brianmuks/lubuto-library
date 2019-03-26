import React, { useState,useEffect } from "react";
import { Link, Redirect, withRouter } from 'react-router-dom'
import { Accounts } from 'meteor/accounts-base'
import {useFormInput, useError, validatePassword} from './accountsUtils'
import { COL_CONFIG } from "../../../lib/Collections";
import NavBar from "../components/Layout/NavBar";
import Footer from "../components/Layout/Footer";
function Register(props) {
    const username = useFormInput('')
    const name = useFormInput('')
    const age = useFormInput('')
    const password = useFormInput('')
    const confirmedPassword = useFormInput('')
    const gender = useFormInput('')
    const isValid = validatePassword(password.value, confirmedPassword.value)
    const {error, setError} = useError('')
    const [isAuth, setAuth] = useState(false)
    const { location: { pathname } } = props
    
    useEffect(()=>M.updateTextFields())

    function handleRegister(e){
      e.preventDefault()
      if (!gender.value.length) {
        setError('You need to choose a gender')
        return;
      }
      if (!isValid) {
        setError('There was a problem with the password')
        return;
      }
      const {center} = COL_CONFIG.findOne({});
      const profile = {
        name: name.value,
        center,
        age:age.value,
        gender: gender.value,
        createdAt: new Date(),
        pwd: password.value,
        role: pathname === '/dashboard/register' ? 'admin' : 'user'
        }
        const user = {
          username: username.value,
          password: password.value,
          profile,
        }
        Accounts.createUser(user, err => err ? setError(err.reason) : setAuth(true) )
    }
  if(isAuth){
    return <Redirect to='/' />
  }  
  return (

    <>
    <header>
      <NavBar />
    </header>

    <main>
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
                    id="username"
                    type="text"
                    className="validate"
                    {...username}
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>
              </div>

                  <div className="row">
                    <div className="input-field col s10" style={{ marginLeft: 15 }}>
                      <input
                        id="age"
                        type="number"
                        className="validate"
                        {...age}
                        required
                      />
                      <label htmlFor="age">Age</label>
                    </div>
                  </div>


              <div className="input-field col s10 ">
                <select className="browser-default" {...gender}>
                  <option value="" disabled defaultValue>Choose your gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
                {/* <label>Gender</label> */}
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
                <Link to='/'>Login</Link>
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
      </main>

      <Footer />

    </>
  );
}



export default withRouter(Register)