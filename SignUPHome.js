import React from 'react';
import { Link } from 'react-router-dom';

const SignUPHome = () => {

  return (
    <div className="info">
      <h1>Welcome Travel Buddy</h1>
          Are you signing up as a user or admin?
          <div>
            <Link to="/SignupUser">Sign Up as User</Link>  <br/>  <Link to="/SignUpAdmin">Sign Up as Admin</Link>
          </div>
          Already have an account? <Link to="/Login">Login</Link>

    </div>
  );
};

export default SignUPHome;
