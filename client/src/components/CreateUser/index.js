import React from "react";

function CreateUser() {

  return (
    <div className="card mx-auto" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title text-center">Crate a new account</h5>
        <form>
          <div className="form-group">
            <label for="emailAddress">Email address</label>
            <input type="email" className="form-control" id="emailAddress" placeholder="Email Address"></input>
          </div>
          <div className="form-group">
            <label for="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password"></input>
          </div>
          <div className="form-group">
            <label for="confirmPassword">Confirm password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password"></input>
          </div>
          <button type="submit" className="btn btn-primary ">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;

