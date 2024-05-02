import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {useCart} from './CartContext';
import Select from 'react-select';

const Home = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [stays, setStays] = useState([]);
    const {addToCart, cart} = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:9000/getStays')
            .then(response => {
                const staysWithHover = response.data.map(stay => ({
                    ...stay,
                    isHovered: false
                }));
                setStays(staysWithHover);
            })
            .catch(error => console.error('Error fetching stays:', error));
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);    

    const handleAddToCart = (stay) =>{
        localStorage.setItem('current Stay', JSON.stringify(stay));
        navigate("/BookingPage")
    }

    const handleSignOut = (event) => {
        event.preventDefault();
        localStorage.clear();
        navigate("/login");
    };

    const toggleHover = (index, hoverState) => {
        setStays(stays.map((stay, i) => {
            if (i === index) {
                return { ...stay, isHovered: hoverState };
            }
            return stay;
        }));
    };

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: 'white',
            borderColor: state.isFocused ? 'blue' : 'gray',
            boxShadow: state.isFocused ? '0 0 0 1px blue' : 'none',
            '&:hover': {
                borderColor: state.isFocused ? 'blue' : 'gray'
            },
            height: '50px',
            color: 'black',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? 'lightgray' : 'white',
            color: state.isSelected ? 'black' : 'gray',
            '&:hover': {
                backgroundColor: 'lightblue',
                color: 'white',
            },
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: 'lightgray',
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'black',
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            color: 'black',
            '&:hover': {
                backgroundColor: 'red',
                color: 'white',
            },
        }),
    };

    const options = [
        { value: 'breakfast_included', label: 'Breakfast included' },
        { value: 'all_inclusive', label: 'All inclusive' },
        { value: 'air_conditioner', label: 'Air conditioner' },
        { value: 'pet_friendly', label: 'Pet friendly' },
        { value: 'pool', label: 'Pool' },
        { value: 'accesibility_friendly', label: 'Accesibility friendly' },
        { value: 'car_service', label: 'Car service' },
        { value: 'free_cancellation', label: 'Free cancellation' },
        { value: 'parties_allowed', label: 'Parties allowed' },
    ];    

    const filteredStays = stays.filter(stay => {
        const normalizedFeatures = stay.features
            .filter(feature => feature && feature.value)
            .map(feature => feature.value.toLowerCase());
            const hasAllFeatures = selectedFeatures.every(feature =>
            normalizedFeatures.includes(feature.value.toLowerCase())
        );
        return hasAllFeatures;
    });
    
    
    
    
    console.log("Filtered stays:", filteredStays);
    return (
        <div>
            <div className='info'>
                <div className='text'>
                    <Link className="navlink" to="/Cart"><button>Cart</button></Link>
                    <button onClick={handleSignOut}>Logout</button>
                    <h1>Potential Stays</h1>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedFeatures}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        styles={customStyles}
                    />
                    {filteredStays.map((stay, index) => (
                        <div className="stay-container" key={index}>
                            <h3>{stay.name_stay}</h3>
                            <p>About us: {stay.about_stay}</p>
                            <p>Rooms: {stay.num_of_rooms}</p>
                            <ul>
                            {stay.features.length > 0 && (
                            <ul>
                                {stay.features.map((Option, index) => (
                                    <li key={index}>{Option.label}</li>
                                ))}
                            </ul>
                            )}
                            </ul>
                            <p><strong>Dates: </strong> 
                                {new Date(stay.availability[0].startDate).toLocaleDateString()}<> - </> 
                                {new Date(stay.availability[0].endDate).toLocaleDateString()}
                            </p>
                            <button
                                onMouseEnter={() => toggleHover(index, true)}
                                onMouseLeave={() => toggleHover(index, false)}
                                style={{ backgroundColor: stay.isHovered ? '#0056b3' : undefined }}
                                onClick={() => handleAddToCart(stay)}
                            >
                            {stay.isHovered ? 'Book Now' : `Price: $${stay.price}`}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
