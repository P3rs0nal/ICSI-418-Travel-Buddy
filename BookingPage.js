import { useNavigate} from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { useState } from "react";
import {useCart} from './CartContext';
import axios from 'axios';

const BookingPage = () => {
    const {addToCart, clearCart, cart} = useCart();
    const loggedInUser = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();
    const stay1 = localStorage.getItem('current Stay');
    const stay = JSON.parse(stay1);
    const [availability, setAvailability] = useState([{
        startDate: new Date(stay.availability[0].startDate),
        endDate: new Date(stay.availability[0].endDate),
        key:'selection'
    }]);
    const [isHovered, setIsHovered] = useState(false);
    const [numOfGuests, setNumOfGuests] = useState(1);
    const [booking, setBooking] = useState(false);
    const handleNumOfGuestsChange = (event) => {
        const value = parseInt(event.target.value);
        if (!isNaN(value) && value > 0 && value <= stay.num_of_guests) {
            setNumOfGuests(value);
        }
    };

    const handleAddToCart = (stay) =>{
        const bookingData = {
            name_stay: stay.name_stay,
            about_stay: stay.about_stay,
            policies: stay.policies,
            num_of_rooms: stay.num_of_rooms,
            availability: stay.availability,
            num_of_bathrooms: stay.num_of_bathrooms,
            num_of_guests: numOfGuests,
            price: stay.price,
            features: stay.features
        };
        const added = cart.some(item => item._id === stay._id);
        if(!added){
            addToCart(stay);
            alert("Added!"); 
            navigate('/Home');
        }
        else{
            alert("This stay is already in your cart!");
        }
    }

    const handleHome = () =>{
        navigate('/Home');
    }

    const handleHover = (hoverState) => {
        setIsHovered(hoverState);
    };

    const handleDateSelect = (ranges) => {
        const startDate = ranges.selection.startDate;
        const endDate = ranges.selection.endDate;
        const availableStartDate = new Date(stay.availability[0].startDate);
        const availableEndDate = new Date(stay.availability[0].endDate);

        if (startDate < availableStartDate || endDate > availableEndDate) {
            const adjustedStartDate = startDate < availableStartDate ? availableStartDate : startDate;
            const adjustedEndDate = endDate > availableEndDate ? availableEndDate : endDate;
            setAvailability([{ startDate: adjustedStartDate, endDate: adjustedEndDate, key: 'selection' }]);
        } else {
            setAvailability([ranges.selection]);
        }
    };

    return (
        <form>
            <div className='input'>
                <div className='text'>
                    {loggedInUser != null &&
                        <p> {"Welcome! " + loggedInUser}</p>
                    }
                </div>
                <div>
                    <h1> Your Pick </h1>
                    <div className="info">
                        <h3>{stay.name_stay}</h3>
                        <p><strong>About us:</strong> {stay['name_stay']}</p>
                        <p><strong>Policies:</strong> {stay['policies']}</p>
                        <p><strong>Rooms:</strong> {stay['num_of_rooms']}</p>
                        <p><strong>Bathrooms:</strong> {stay['num_of_bathrooms']}</p>
                        <p><strong>Number of Guests Allowed:</strong> {stay['num_of_guests']}</p>
                        <div>
                            <label htmlFor="numOfGuests"><strong>Select Number of Guests:</strong></label>
                            <input
                                type="number"
                                id="numOfGuests"
                                name="numOfGuests"
                                min="1"
                                max={stay.num_of_guests}
                                value={numOfGuests}
                                onChange={handleNumOfGuestsChange}
                            />
                        </div>
                        <p><strong>Dates Available: </strong> 
                            {new Date(stay.availability[0].startDate).toLocaleDateString()}<> - </>
                            {new Date(stay.availability[0].endDate).toLocaleDateString()}
                        </p>
                        <DateRange
                            editableDateInputs={true}
                            onChange={handleDateSelect}
                            moveRangeOnFirstSelection={false}
                            ranges={availability}
                        />
                        <button
                            onMouseEnter={() => handleHover(true)}
                            onMouseLeave={() => handleHover(false)}
                            style={{ backgroundColor: isHovered ? '#0056b3' : undefined }}
                            onClick={() => handleAddToCart(stay)}
                        >
                            {isHovered ? 'Add to Cart' : `Price: $${stay.price}`}
                        </button>
                        <button onClick={() => handleHome()}>Home</button>
                    </div>
                </div>
            </div>
            <div className='click'></div>
        </form>
    )
}
export default BookingPage;