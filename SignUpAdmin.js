import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUpAdmin() {
    const navigate = useNavigate();

    // Use useState to manage input values
    const [formData, setFormData] = useState({
        first_Name: '',
        last_Name: '',
        UserName: '',
        Password: '',
        PhoneNumber: '',
        Email: '',
        isAdmin: true
    });

    // Update state on input change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Handle form submission
    const handleSignUp = (event) => {
        event.preventDefault();
        axios.post('http://localhost:9000/createUser', formData)
            .then((res) => {
                alert('Success!');
                navigate('/HomeAdmin'); // Navigate on successful API response
            })
            .catch((err) => {
                alert('Error in Signing Up');
            });
    };

    return (
        <div className="info">
            <h2>Sign Up Your Stays!</h2>
            <form onSubmit={handleSignUp}>
                <div className="UserInput">
                    <input type="text" name="first_Name" placeholder="First Name" value={formData.first_Name} onChange={handleChange} required />
                </div>
                <div className="UserInput">
                    <input type="text" name="last_Name" placeholder="Last Name" value={formData.last_Name} onChange={handleChange} required />
                </div>
                <div className="UserInput">
                    <input type="text" name="UserName" placeholder="User ID" value={formData.UserName} onChange={handleChange} required />
                </div>
                <div className="UserInput">
                    <input type="password" name="Password" placeholder="Password" value={formData.Password} onChange={handleChange} required />
                </div>
                <div className="UserInput">
                    <input type="text" name="PhoneNumber" placeholder="Phone Number" value={formData.PhoneNumber} onChange={handleChange} required />
                </div>
                <div className="UserInput">
                    <input type="email" name="Email" placeholder="Email" value={formData.Email} onChange={handleChange} required />
                </div>
                <button type="submit">SUBMIT</button>
                <p>Already a member?</p> 
                <Link to="/Login">Login</Link>
            </form>
        </div>
    );
}

export default SignUpAdmin;