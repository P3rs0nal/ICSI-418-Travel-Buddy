import React, { useState } from 'react';
import './App';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


function Payment(props) {

    const [error, setError] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardHolderName: '',
        cardNumber: '',
        expiration: '',
        securityCode: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/createPayment', formData);
            console.log('Payment successful:', response.data);
            setPaymentSuccess(true);
        } catch (error) {
            console.error('Payment failed:', error.message);
            setError('Payment failed. Please try again later.');
        }
    };

    if(paymentSuccess)
        return <Navigate to="/Reciept" replace/>;

    return (
        <div className="UserInput">
            <h1>Payment</h1>
            <div className="info">
            <form onSubmit={handlePayment}>
                    <p>Name on Card</p>
                    <input type="text" placeholder = "First Last" name="cardHolderName" value={formData.cardHolderName} onChange={handleInputChange} required className="UserInput"/>
                    <p>Card Number</p>
                    <input type="text" placeholder =  "####-####-####-####" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required className="UserInput"/>
                    <p>Expiration</p>
                    <input type="text" placeholder="MM/YY" name="expiration" value={formData.expiration} onChange={handleInputChange} required className="UserInput"/>
                    <p>Security Code</p>
                    <input type="text" placeholder="CVV" name="securityCode" value={formData.securityCode} onChange={handleInputChange} required className="UserInput"/>
                    <div className="button">
                        <button type="submit" Navigate to="/Reciept"> Book my Stay!</button>
                    </div>
                    <div className="member">
                         <a href="/Home">Add More?</a>
                    </div>
                </form>
            </div>
            
        </div>
    );
}

export default Payment;