import React from "react";

function Login() {
  return (
    <div className="row">
      <div className="col s4" />
      <div className="col s4 " style={{ paddingTop: 30, margin: 0 }}>
        <div className="card">
          <div className="row">
            <div className="col s12 center-align"> LOGIN</div>
            <form className="col s12" role="form" method="post" action="login">
              <div className="row">
                <div className="input-field col s10">
                  <input
                    id="username"
                    type="text"
                    className="validate"
                    name="username"
                    required
                  />
                  <label for="username">Username</label>
                </div>
              </div>

              <div className="row">
                <div className="input-field col s10 ">
                  <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    className="validate"
                    name="password"
                    required
                  />
                  <label for="password">Password</label>
                </div>
              </div>

              <div className="row" style={{ marginLeft: 15 }}>
                <p>
                  <input type="checkbox" id="rem" className="blue lighten-3" />
                  <label for="rem">Remeber me</label>
                </p>
              </div>

              <div className="row">
                <div className="input-field col s12">
                  <button className="waves-effect waves-light btn">
                    Login
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login