import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

function Cart() {
    const { cart, removeFromCart } = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart-info">
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className='cart-item'>
                                <h3>{item.name_stay}</h3>
                                <p>
                                    <strong>Date: </strong> 
                                        {new Date(item.availability[0].startDate).toLocaleDateString()}<> - </> 
                                        {new Date(item.availability[0].endDate).toLocaleDateString()}
                                </p>
                                <p><strong>Price:</strong> ${item.price}</p>
                                <button onClick={() => removeFromCart(item._id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <br/>
                    <strong>Total Price:</strong>
                    <p className="stay-container"> ${totalPrice.toFixed(2)}</p>
                    <Link className='link-button' to="/Payment">Proceed to Checkout</Link><br/>
                    <Link className='link-button' to="/Home">Continue Shopping</Link>
                </div>
            ) : (
                <p>Your cart is empty. <br/>
                    <Link to="/Home" className='link-button'>Add some stays!</Link></p>
            )}
        </div>
    );
}

export default Cart;
