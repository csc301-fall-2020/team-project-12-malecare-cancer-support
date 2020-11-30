/**
 * This will contain routes related to users i.e registration or login
 *
 * */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const {registerValidation, loginValidation} = require('../validation');


//Registration route
router.post('/signup',   async (req, res) => {

    // Validating data of the user before submission
    let {error} = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the user is already in database
    let emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('Email address already exists');
    }

    //generate a hashed password
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // creates user with a hashed password
    //  more objects can be passed in here
    const user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: hashedPassword,
        birthday: req.body.birthday,
        phone: req.body.phone,
        gender: req.body.gender,
        sexual_orientation: req.body.sexual_orientation,
        treatments: req.body.treatment_types,
        cancer_types: req.body.cancer_types,
        medication: req.body.medication,
        is_mentee: req.body.is_mentee,
        is_mentor: req.body.is_mentor,
        is_partner: req.body.is_partner,
        bio: req.body.bio,
        interests: req.body.interests

    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }
    catch (err) {
        res.status(400).send(err);
    }
});

//login route
router.post('/login', async (req, res) => {
    //Validating login registration details
    let {error} = loginValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    // if the email does not exist
    if (!user) {
        return res.status(400).send('Email address or Password is wrong');
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Email address or password is wrong');

    //create token
    const accessToken = jwt.sign(
        {userId: user._id.toString()},
        'SECRET_TOKEN',
        {expiresIn: '1h'}
    );
    res.status(200).json({
        accessToken
    });

    //do something here. Redirect to the main screen which I do not know yet
    res.send('We are logged in');
});

module.exports = router;

