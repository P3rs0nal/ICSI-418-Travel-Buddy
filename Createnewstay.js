import { useState } from "react";
import axios from "axios";
import Select from 'react-select';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { Link } from 'react-router-dom';
export const Createnewstay = (props) => {
    const [name_stay, setname_stay] = useState("");
    const [about_stay, setabout_stay] = useState("");
    const [policies, setpolicies] = useState("");
    const [num_of_rooms, setnum_of_rooms] = useState(0);
    const [num_of_bathrooms, setnum_of_bathrooms] = useState(0);
    const [price, setprice] = useState(0);
    const [features, setfeatures] = useState([]);
    const [num_of_guests, setnum_of_guests] = useState(0);
    const [availability, setavailability] = useState([{
        startDate: new Date(),
        endDate: null,
        key:'selection'
      }
    ]);
    const [deal_type, setdeal_type] = useState([]);
   
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
    
    

    const dealoptions = [
        { value: 'Deal unavilable', label: 'Deal unavailable' },
        { value: 'Stay Longer, Save More', label: 'Stay Longer, Save More' },
        { value: 'Midweek Madness', label: 'Midweek Madness' },
        { value: 'Refer a Friend, Get Rewarded', label: 'Refer a Friend, Get Rewarded' },
        { value: 'Seasonal Packages', label: 'Seasonal Packages' },
        { value: 'Early Bird Specials', label: 'Early Bird Specials' },
        { value: 'Flash Sales', label: 'Flash Sales' },
        { value: 'Frequent Guest Rewards', label: 'Frequent Guest Rewards' },
        { value: 'Local Partnership Discounts', label: 'Local Partnership Discounts' },
        { value: 'Social Media Contests', label: 'Social Media Contests' },
        { value: 'Corporate Discounts', label: 'Corporate Discounts' },
      ];

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
    
     
    const handleCreatenewstay = (event) => {
        event.preventDefault();
        const featureVal = features.map(feature => feature.value);
        axios.post('http://localhost:9000/createnewstay', { name_stay, about_stay, policies,availability, num_of_rooms,num_of_bathrooms,price,features,num_of_guests, deal_type})
            .then((res) => alert('new stay created !'))
            .catch((err) => alert(err))
    }


    const handleChange = (options) => {
        setfeatures(options);
      };
    
    const handleChangedeal = (dealoptions) => {
        setdeal_type(dealoptions);
      };

    return (
        <form onSubmit={handleCreatenewstay}>
            <div class='input'>
                <div class='text'>
                    <label for="price">Name </label>
                    <input type="text" id="name_stay" name="name_stay" placeholder="Stay Name" value={name_stay} onChange={(event) => setname_stay(event.target.value)} /><br/>
                    <label for="price">Description </label>
                    <input type="text" id="about_stay" name="about_stay" placeholder="Description" value={about_stay} onChange={(event) => setabout_stay(event.target.value)} /> <br/>
                    <label for="price">Policies </label>
                    <label for="policies"></label>
                    <input type="text" id="policies" name="policies" placeholder="Policies/Terms" value={policies} onChange={(event) => setpolicies(event.target.value)} /><br/>
                    <label for="price">Rooms </label>
                    <input type="text" id="num_of_rooms" name="num_of_rooms" placeholder="Rooms" value={num_of_rooms} onChange={(event) =>setnum_of_rooms(event.target.value)}/><br/>
                    <label for="num_of_bathrooms">Bathrooms </label>
                    <input type="text" id="num_of_bathrooms" name="num_of_bathrooms" placeholder="Bathrooms" value={num_of_bathrooms} onChange={(event) =>setnum_of_bathrooms(event.target.value)}/><br/>
                    <label for="price">Price </label>
                    <input type="number" id="price" name="price" placeholder="Price" value={price} onChange={(event) =>setprice(event.target.value)}/><br/>
                    <label for="num_of_guests">Guests </label>
                    <input type="text" id="num_of_guests" name="num_of_guests" placeholder="Guests" value={num_of_guests} onChange={(event) =>setnum_of_guests(event.target.value)}/><br/>
                    <Select
                        isMulti
                        value={features}
                        onChange={handleChange}
                        options={options}
                        placeholder="Select Features"
                        styles={customStyles}
                    />
                     <div class="Selectedfeatures">
                    <div>
                    {features.length > 0 ? (
                <div>
                    <p>Selected features:</p>
                <ul>
                    {features.map(Option => (
                    <li key={Option.value}>{Option.label}</li>
                    ))}
                </ul>
                </div>
                ) : (
                <p>No options selected</p>
                )}
                </div>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => setavailability([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={availability}
                     />
                    </div>
                    <Select
                        isMulti
                        value={deal_type}
                        onChange={handleChangedeal}
                        options={dealoptions}
                        placeholder="Select Your Deals"
                        styles={customStyles}
                    />
                <div>
                    {deal_type.length > 0 ? (
                <div>
                    <p>Selected deals:</p>
                <ul>
                    {deal_type.map(dealoption => (
                    <li key={dealoption.value}>{dealoption.label}</li>
                    ))}
                </ul>
                </div>
                ) : (
                <p>No options selected</p>
                )}
                </div>
                </div>
                
                <div class='click'>
                <button type="button" onClick={(event) => handleCreatenewstay(event,name_stay, about_stay, policies,availability, num_of_rooms,num_of_bathrooms,price,features,num_of_guests,deal_type)}>Create New Stay</button>
                    <Link class="navlink" to="/HomeAdmin"><button class="nav">back to Home page</button></Link>
                    <Link class="navlink" to="/Login"><button class="nav">back to login page</button></Link>
                </div>
            </div>

        </form>
    )
}