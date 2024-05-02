import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const HomeAdmin = () => {
    const [stays, setStays] = useState([]);
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStays();
    }, []);

    const fetchStays = () => {
        axios.get('http://localhost:9000/getStays')
            .then(response => {
                setStays(response.data);
            })
            .catch(error => console.error('Error fetching stays:', error));
    };

    const handleSignOut = () => {
        localStorage.clear();
        navigate("/login");
    }

    const handleRemoveStay = (id) => {
        axios.delete(`http://localhost:9000/deleteStay/${id}`)
            .then(response => {
                if (response.status === 200) {
                    fetchStays();
                }
            })
            .catch(error => console.error('Error removing stay:', error));
    }

    return (
        <div>
            <div className='input'>
                <div className='text'>
                    {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
                    <Link className="button" to="/CreateNewStay"><button className="button">Add New Stay</button></Link>
                    <button className="button" onClick={handleSignOut}>Sign Out</button>
                </div>
                <h1>Your Locations</h1>
                <div className="info">
                    {stays && stays.length > 0 ? (
                        stays.map((stay, index) => (
                            <div className="stay-container" key={index}>
                                <h3>{stay.name_stay}</h3>
                                <p>{stay.about_stay}</p>
                                <button className="button" onClick={() => handleRemoveStay(stay._id)}>Remove</button>
                            </div>
                        ))
                    ) : (
                        <p>No stays available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeAdmin;
