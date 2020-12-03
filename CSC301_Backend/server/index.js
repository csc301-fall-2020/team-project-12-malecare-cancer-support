const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const User = require('../models/users');

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

app.get('/user/:userId', async(req, res) => {
    
    
    const o_id = mongoose.isValidObjectId(req.params.userId);//dont need this
    console.log(o_id);
    var oid = mongoose.Types.ObjectId(req.params.userId);
    console.log(oid)
    try {
      
        const user = await User.findById({_id: oid});
        console.log(user)
        console.log()
        console.log('abc')
        res.status(200).json({user: user});
        
    }
    catch (err) {
        console.log("abcd")
        res.status(400).json({error: "Error in finding user"});
    }
});

app.listen(5000, () => console.log('Success, Server is up and running!'));
