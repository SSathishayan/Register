const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', () => console.log('Error in connecting to Database'));
db.once('open', () => console.log('Connected to Database'));

// Route to handle user signup
app.post('/sign_up', (req, res) => {
    const { name, age, email, phonenumber, gender, password } = req.body;

    const data = {
        name,
        age,
        email,
        phonenumber,
        gender,
        password
    };

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            return res.status(500).send('Error inserting record');
        }
        console.log('Record Inserted Successfully');
        return res.redirect('signup_successful.html');
    });
});


app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*'); 
    return res.redirect('index.html');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
