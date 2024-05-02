const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./userSchema'); // Import User model
const Guest = require('./GuestInfoShema');
const Payment = require('./PaymentSchema');
const Stay = require('./staySchema');
const book = require('./bookingSchema');

const app = express();

app.use(express.json());
app.use(cors());

app.listen(9000, () => {
    console.log('server started at 9000');
});

const mongoString = "mongodb+srv://ejagroop:1fXtklsICrl5DMq6@cluster0.m82ziuf.mongodb.net/TravelBuddies";
mongoose.connect(mongoString);
const database = mongoose.connection;
database.on('error', (error) => console.log(error));
database.once('connected', () => console.log('Database Connected'));

app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUser', async (req, res) => {
    const UserName = req.query.UserName
    const Password = req.query.Password
    try {
        const user = await User.findOne({ UserName, Password })
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
});

app.post('/createGuest', async (req, res) => {
    try {
        const guest = new Guest(req.body);
        await guest.save();
        res.send(guest);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/createPayment', async (req, res) => {
    try {
        const payment = new Payment(req.body);
        await payment.save();
        res.send(payment);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/createAdmin', async (req, res) => {
    try {
        const guest = new Guest(req.body);
        await guest.save();
        res.send(guest);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/createPayment', async (req, res) => {
    try {
        const pay = new Payment(req.body);
        await pay.save();
        res.send(pay);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getUser', async (req, res) => {
    const UserID = req.query.UserID;
    const Password = req.query.Password;
    const isAdmin = req.query.isAdmin;
    try {
        const user = await User.findOne({ UserID, Password, isAdmin });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/updateCart', async(req, res) =>{
    const{UserName, cart} = req.body;
    try{
        const user = await User.findByIdAndUpdate(UserName,{
            $set: {cart: cart}},
        {new: true});
        res.status(200).json(user.cart);
    }
    catch (error){
        res.status(404).json({ message: 'Failed to add' });
    }
});

app.delete('/deleteStay/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stay = await Stay.findByIdAndDelete(id);
        if (!stay) {
            return res.status(404).json({ message: "Stay not found" });
        }
        res.status(200).json({ message: "Stay deleted successfully" });
    } catch (error) {
        console.error('Error deleting stay:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.get('/getStays', async (req, res) => {
    try {
        const stays = await Stay.find();
        console.log(stays);
        res.status(200).json(stays);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stays", error: error });
    }
});

app.post('/createnewstay', async (req, res) => {
    try {
        const stay = new Stay({
            name_stay: req.body.name_stay,
            about_stay: req.body.about_stay,
            policies: req.body.policies,
            num_of_rooms: req.body.num_of_rooms,
            num_of_bathrooms: req.body.num_of_bathrooms,
            price: req.body.price,
            features: req.body.features,
            num_of_guests: req.body.num_of_guests,
            availability: req.body.availability,
            deal_type: req.body.deal_type
        });

        await stay.save();
        res.status(201).send('New stay created successfully!');
    } catch (error) {
        console.error(error);
        res.status(400).send('Error creating new stay');
    }
});
