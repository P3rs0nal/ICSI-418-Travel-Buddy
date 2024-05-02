import React from 'react';
import ReactDOM from 'react-dom/client';

import SignUPHome from './SignUPHome';
import Login from './Login'
import Reciept from './Reciept'
import Payment from './Payment'
import GuestInfo from './GuestInfo'
import ForgotPassword from './ForgotPassword';
import { Createnewstay } from './Createnewstay';
import Cart from './Cart';
import SignUpAdmin from './SignUpAdmin';
import Home from './Home';
import SignupUser from './SignupUser';
import BookingPage from './BookingPage';
import {BrowserRouter,Routes, Route,Link} from "react-router-dom";
import  HomeAdmin  from './HomeAdmin';
import './App.css';
import { CartProvider } from './CartContext';


function App() {
  return (
<CartProvider>
 <BrowserRouter>
  <Routes>
  <Route path = "/" element = {<SignUPHome/>}/>
    <Route path = "/SignUPHome" element = {<SignUPHome/>}/>
    <Route path = "/Reciept" element = {<Reciept/>}/>
    <Route path = "/Payment" element = {<Payment/>}/>
    <Route path = "/HomeAdmin" element = {<HomeAdmin/>}/>
    <Route path = "/Home" element = {<Home/>}/>
    <Route path = "/GuestInfo" element = {<GuestInfo/>}/>
    <Route path = "/ForgotPassword" element = {<ForgotPassword/>}/>
    <Route path = "/Createnewstay" element = {<Createnewstay/>}/>
    <Route path = "/Cart" element = {<Cart/>}/>
    <Route path = "/Login" element = {<Login/>}/>
    <Route path = "/BookingPage" element = {<BookingPage/>}/>
    <Route path = "/SignUpAdmin" element = {<SignUpAdmin/>}/>
    <Route path = "/SignupUser" element = {<SignupUser/>}/>
  </Routes>
 </BrowserRouter>
 </CartProvider>
  );
}

export default App;