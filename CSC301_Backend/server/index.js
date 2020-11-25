const express = require("express");
const app = express();
const bodyParser = require('body-parser');


//----------------------------------------
const mongoose = require('mongoose');

const user = require('../Routers/users');


mongoose.connect('mongodb://localhost:27017/cancer',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected to db')
    );

//--------------------------------------------


// for communication between front end & backend from different servers

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', user);

app.listen(3000, () => console.log('Success, Server is up and running!'));
