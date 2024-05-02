import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

function GuestInfo() {

  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const signupValues = {
      first_Name: document.querySelector('input[placeholder="First Name"]').value,
      last_Name: document.querySelector('input[placeholder="Last Name"]').value,
      PhoneNumber: document.querySelector('input[placeholder="PhoneNumber"]').value,
      Email: document.querySelector('input[placeholder="Email"]').value
    };

    axios.post('http://localhost:9000/createGuest', signupValues)
      .then(() => {
        alert('Success!');
        navigate('/Home'); // Navigate on successful API response
      })
      .catch(() => alert('Error in Signing Up'));
  };

  return (
    <div className="info">
      <h2>Guest Signup</h2>
      <form onSubmit={handleSignUp}>
        <div className="UserInput">
          <input type="text" placeholder="First Name" required />
        </div>
        <div className="UserInput">
          <input type="text" placeholder="Last Name" required />
        </div>
        <div className="UserInput">
          <input type="text" placeholder="PhoneNumber" required />
        </div>
        <div className="UserInput">
          <input type="email" placeholder="Email" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GuestInfo;
