import React from "react";
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
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
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Enter password"
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary">
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