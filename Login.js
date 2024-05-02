import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [loginValues, setLoginValues] = useState({ UserName: '', Password: '' });

    const handleLogin = (event) => {
        event.preventDefault();
        axios.get('http://localhost:9000/getUser', { params: loginValues })
            .then((res) => {
                if (res.data) {
                    alert('Login Successful');
                    localStorage.clear();
                    localStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('loggedInUser', res.data.first_Name);
                    localStorage.setItem('isAdmin', res.data.isAdmin);
                    if (res.data.isAdmin) {
                        navigate("/HomeAdmin");
                    } else {
                        navigate("/Home");
                    }
                } else {
                    alert('Wrong Credentials');
                }
            })
            .catch((err) => {
                console.error("Login failed:", err);
                alert("Error in Login: " + err.message);
            });

        setLoginValues({ UserName: '', Password: '' });
    };

    return (
        <div className="info">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
                <div className="UserInput">
                    <input type="text" placeholder="UserName" value={loginValues.UserName} onChange={(e) => setLoginValues({ ...loginValues, UserName: e.target.value })} required/>
                </div>
                <div className="UserInput">
                    <input type="password" placeholder="Password" value={loginValues.Password} onChange={(e) => setLoginValues({ ...loginValues, Password: e.target.value })} required/>
                </div>
                <button type="submit">LOGIN</button>
            </form>
            <p>Not a member?</p>
            <p>Sign up here <Link to="/SignUPHome">Sign up</Link></p>
        </div>
    );
};

export default Login;
