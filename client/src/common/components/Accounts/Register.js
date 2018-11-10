import React, { useState } from "react";

function Register({role}) {
    const email = useFormInput('Email Address')
    const password = useFormInput('Password')
    const confirmedPassword = useFormInput('Confirm Password')

    // create an account from here

  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> LOGIN</div>
            <form className="col s12" role="form" method="post" action="login">
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
                    Login
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                    {`This register is for ${role}`}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export function useFormInput(initialValue){
    const [value, setValue] = useState(initialValue)
    function handleChange(e){
        setValue(e.target.value)
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Register