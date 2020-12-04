/**
 * This will contain routes related to users i.e registration or login
 *
 * */

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');
const auth = require('../middleware/is-auth');
const {registerValidation, loginValidation} = require('../validation');


//Registration route
router.post('/signup',   async (req, res) => {

    // Validating data of the user before submission
    let {error} = registerValidation(req.body);
    if (error)
        return res.status(400).json({error: error.details[0].message});
    //checking if the user is already in database
    let emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).json({error: 'Email address already exists'});
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
        location: req.body.location,
        gender: req.body.gender,
        sexual_orientation: req.body.sexual_orientation,
        treatments: req.body.treatments,
        cancer_types: req.body.cancer_types,
        medications: req.body.medications,
        is_mentee: req.body.is_mentee,
        is_mentor: req.body.is_mentor,
        is_partner: req.body.is_partner,
        bio: req.body.bio,
        interests: req.body.interests,
        likes: [],
        liked_by: [],
        matched: [],
        passed: []
    });
    if (user.interests.length === 0){//not required
        delete user.interests;
      }
    try {
        const savedUser = await user.save();
        const payload = {
            userId: savedUser._id
        }
        
        jwt.sign(
            payload,
            'SECRET_TOKEN',
            {expiresIn: '1h'},
            function(err, accessToken){
                if (err) {
                    res.send(err);
                }
                res.status(200).json({
                    accessToken : accessToken,
                    userId: payload["userId"]//not the right syntax
                });
            });
    }
    catch (err) {
        res.status(400).json({error: err});
    }
});

//login route
router.post('/login', async (req, res) => {
    //Validating login registration details
    let {error} = loginValidation(req.body);
    if (error)
        return res.status(400).json({error: error.details[0].message});

    let user = await User.findOne({email: req.body.email});
    // if the email does not exist
    if (!user) {
        return res.status(400).json({error: 'Email address or password is incorrect'});
    }

    //check if password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).json({error: 'Email address or password is incorrect'});

    const accessToken = jwt.sign({userId: user}, 'SECRET_TOKEN');//should be user._Id?
    res.header('auth-token', accessToken).json({accessToken: accessToken, userId: user._id});
});

//get current-user
// router.get('user/:userId', auth, async(req, res) => {
//     const userId = req.params.userId;
//     try {
        // const user = await User.findById(userId);
        // // do something here with the user
        // res.json({user: user});
//     }
//     catch (err) {
//         res.status(400).json({error: 'Error in finding user'});
//     }
// });

module.exports = router;

