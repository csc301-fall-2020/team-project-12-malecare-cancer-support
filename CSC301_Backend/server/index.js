const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const User = require('../models/users');

//----------------------------------------
const mongoose = require('mongoose');

const user = require('../Routers/users');
const data = require('../Routers/data');


mongoose.connect('mongodb://localhost:27017/cancer',
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('connected to db')
    );

//---------------------------------------------------------------------
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
app.use('/data', data);
app.get('/user/:userId', async(req,res) => {
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

app.get('/matches/:userId', async(req,res) => {
    const oid = mongoose.Types.ObjectId(req.params.userId);
    try {
        const user = await User.findById({_id: oid});
        let ret_users = []
        if (user.liked_by.length !== 0){
            for (let i = 0; i < user.liked_by.length; i++){
                if (!user.passed.includes(user.liked_by[i])){
                    ret_users.push(user.liked_by[i])
                }
            }
        }
        if (ret_users.length < 5){
            const all_users = User.find({})
            let count = 0
            do {
                if (!user.passed.includes(all_users[count])){
                    ret_users.push(all_users[count])
                }
                count++
            } while (ret_users.length < 5 || count < all_users.length)
            count = 0
            if (ret_users.length < 5 || user.passed.length !== 0){
                do{
                    ret_users.push(user.passed[count])
                }while(ret_users.length < 5 || count < all_users.length)
            }
        }
        res.send(ret_users)
        res.status(200).json({users: ret_users});
    }
    catch (err) {
        res.status(400).json({error: "Error in matches"});
    }
});


app.post('/matches/connect/:currentUser&:UserthatwasLiked', async (req, res) => {

    // When current user likes another user (liked) we update both of their arrays/ properties
    // if both of them like each other then match (remove each other from liked arrays
    // if at least one of them doesn't like the other, then add this user
    try {
        // const currentUser = req.params.currentUser;
        // const likedUser = req.params.UserthatwasLiked;
        const currentUser = await User.findById({_id: req.params.currentUser}).exec()
        const likedUser = await User.findById({_id:req.params.UserthatwasLiked}).exec()
        console.log(currentUser.id);
        console.log(likedUser.id);
        // const likedUser = User.findById(req.params.currentUser);
        //console.log(currentUser);
        //console.log(likedUser);
        //console.log(currentUser.liked_by);
        //console.log(currentUser.liked_by.contains(likedUser));
        //  try{
        //     User.findById(currentUser, function(err, user){
        //         console.log(user.liked_by);
        //         user.liked_by.push(likedUser);
        //         user.save()
        //         console.log(user.liked_by)
        //         console.log(user.liked_by.includes(likedUser));
        //     })
        // }catch(err){
        //     console.log(err)
        // }
        if (currentUser.liked_by.includes(likedUser.id)){
            console.log('Hurray');
            // When Liked User already liked current user -> results in a match
            let index = currentUser.liked_by.indexOf(likedUser.id);
            currentUser.liked_by.splice(index, 1);
            index = likedUser.likes.indexOf(currentUser);
            likedUser.likes.splice(index, 1);
            currentUser.matched.push(likedUser.id);
            likedUser.matched.push(currentUser.id);
            currentUser.save();
            likedUser.save();
        } else{
            // When liked user hasn't liked current user -> add current to likedby list of liked user,
            console.log('Hello');
            // and add liked to likes of current user
            currentUser.likes.push(likedUser.id)
            likedUser.liked_by.push(currentUser.id)
            currentUser.save()
            likedUser.save()
        }
        res.status(200).json({user: user});
    }
    catch (err) {
        res.status(400).json({error: "Error in finding user"});
    }
});

app.post('/matches/pass/:currentUser&:UserthatwasPassed', async (req, res) => {
    // When current user passes another user (liked) we update both of their arrays/ properties
    const currentUser = User.findById({_id: mongoose.Types.ObjectId(req.params.currentUser)})
    const passedUser = User.findById({_id: mongoose.Types.ObjectId(req.params.UserthatwasPassed)})
    let likesindex = currentUser.likes.indexOf(passedUser)
    let matchindex = currentUser.matched.indexOf(passedUser)
    let passedindex = currentUser.passed.indexOf(passedUser)

    if (matchindex <= -1){
        if (passedindex <= -1){
            // User not already passed
            currentUser.passed.push(passedUser)
        }
        if (likesindex > -1){
            // If user was previously liked, then pass on them now and remove them from the likes list
            currentUser.likes.splice(likesindex, 1)
        }
        currentUser.save()
        // res.status(200).json({user: user});
    } else {
        res.status(400).json({error: "User is matched, cannot pass"});
    }


});

app.listen(5000, () => console.log('Success, Server is up and running!'));


// user A - 5fcaf1762137ae5a38470903
// A likes [5fcaf1a32137ae5a38470904 ]

// user B - 5fcaf1a32137ae5a38470904

// B liked_by[5fcaf1762137ae5a38470903 ]


