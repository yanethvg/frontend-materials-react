import React from "react";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const  Login = (saveEmail, savePassword, clickSubmit, error)  =>{
    return  (
        <Card style={{ width: '50rem', margin: "0 auto" }} >
        <div className="Auth-form-container m-5" >
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Login</h3>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Enter email"
                  onChange={(e) => saveEmail(e.target.value)}
                />
                {
                  error && error.email ? (
                    <div className="alert alert-danger mt-1" role="alert">
                      {error.email}
                    </div>
                  ) : null
                }
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                  onChange={(e) => savePassword(e.target.value)}
                />
                 {
                  error && error.password ? (
                    <div className="alert alert-danger mt-1" role="alert">
                      {error.password}
                    </div>
                  ) : null
                }
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={clickSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        </Card>
      )
}
  
export { Login };