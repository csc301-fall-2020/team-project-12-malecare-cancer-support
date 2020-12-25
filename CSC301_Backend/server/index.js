const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const User = require('../models/users');
const socket = require("socket.io");
const Conversation = require('../models/conversation');

//----------------------------------------
const mongoose = require('mongoose');

const user = require('../Routers/users');
const data = require('../Routers/data');
const conversations = require('../Routers/conversations');
const messages = require('../Routers/messages');
const auth = require('../middleware/is-auth');
// 'mongodb://localhost:27017/cancer'
// 'mongodb+srv://Arnur:thefuckingpasswordretard137@cluster0.cqtt9.mongodb.net/cancer?retryWrites=true&w=majority'
mongoose.connect('mongodb+srv://Arnur:thefuckingpasswordretard137@cluster0.cqtt9.mongodb.net/cancer?retryWrites=true&w=majority',
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

app.use('/api/auth', user);
app.use('/api/data', data);
app.use('/api/conversations', conversations);
app.use('/api/messages', messages);

// Helper function that removes the password field and adds an age field when
// a user's info needs to be sent to a client (modifying 'user' directly).
// 'user' must be a Javascript object (eg from .lean()) instead of a Mongoose
// document.
processUser = (user) => {
    user.password = undefined;
    const diff = Date.now() - new Date(user.birthday);
    const dt = new Date(diff);
    user.age = Math.abs(dt.getUTCFullYear() - 1970);
}

app.get('/api/user/:userId', auth, async(req,res) => {
    // const o_id = mongoose.isValidObjectId(req.params.userId);//dont need this
    const oid = mongoose.Types.ObjectId(req.params.userId);
    try {
        // Use lean to return user as a Javascript object, to edit
        const userLean = await User.findById({_id: oid}).lean();
        processUser(userLean);
        res.status(200).json({user: userLean});

    }
    catch (err) {
        res.status(400).json({error: "Error in finding user"});
    }
});

// Here we get 10 random user and its details.
// the auth middle here enforces that the user is authenticated
app.get('/api/users/:userId', auth, async(req, res) => {
    const oid = mongoose.Types.ObjectId(req.params.userId);
    try {
        // const user = await User.find( {_id : { $ne : oid }});
        const user = await User.aggregate([
            { $sample: {size: 10} },
            { $match : { _id :  { $ne : oid } } }
        ]);
        res.status(200).json({user: user});
    }
    catch (err) {
        res.status(400).json({error: "Error in finding user"});
    }
});



// app.get('/all-users', async (req, res) => {
//  const users = await User.find()
//  res.json({users})
// });

// suggestions of users
app.get('/api/suggestions/:userId', async (req, res) => {
    try {
        const oid = mongoose.Types.ObjectId(req.params.userId);
        // get the user by id
        const user = await User.findById({ _id: oid });
        //define filter
        const filter = [];
        //add all the cancer types to filter
        user.cancer_types.forEach(cancer_type => {
            filter.push({cancer_types: cancer_type})
        });
        //add all the interest to filter
        user.interests.forEach(interest => {
            filter.push({interests: interest})
        });
        //add sexual orientation to filter
        filter.push({sexual_orientation: user.sexual_orientation})
        //do the filtration and get only the selected fields
        let ret_users = await User.find({
                $or: filter,
                _id: {$ne: oid}
            },
            { _id: 1, firstname: 1, lastname: 1, cancer_types: 1, location: 1 })
        res.status(200).json({ users: ret_users });
    }
    catch (err) {
        res.status(400).json({ error: "Error in matches" });
    }
});

app.post('/api/matches/connect/:currentUser&:UserthatwasLiked', async (req, res) => {

    // When current user likes another user (liked) we update both of their arrays/ properties
    // if both of them like each other then match (remove each other from liked arrays
    // if at least one of them doesn't like the other, then add this user
    try {
        // const currstring = req.params.currentUser
        // const likedstring = req.params.UserthatwasLiked
        const currentUser = await User.findById({ _id: req.params.currentUser}).exec();
        const likedUser = await User.findById({ _id: req.params.UserthatwasLiked}).exec();
        if (currentUser.liked_by.includes(likedUser.id)) {
            // When Liked User already liked current user -> results in a match
            let index = currentUser.liked_by.indexOf(likedUser.id)
            currentUser.liked_by.splice(index, 1)
            index = likedUser.likes.indexOf(currentUser.id)
            likedUser.likes.splice(index, 1)
            currentUser.matched.push(likedUser.id)
            likedUser.matched.push(currentUser.id)
            currentUser.save()
            likedUser.save()

            conversation = await Conversation.create({
                userIdOne: req.params.currentUser,
                userIdTwo: req.params.UserthatwasLiked,
                userNameOne: currentUser.firstname + ", " + currentUser.lastname,
                userNameTwo: likedUser.firstname + ", " + likedUser.lastname,
                conversationType: "date",
                messages: []
            });
            await currentUser.conversations.push(conversation._id);
            await likedUser.conversations.push(conversation._id);
            await currentUser.save();
            await likedUser.save();

            return res.status(200).json({conversation: {
                _id: conversation._id,
                userIdOne: conversation.userIdOne,
                userIdTwo: conversation.userIdTwo,
                userNameOne: conversation.userNameOne,
                userNameTwo: conversation.userNameTwo,
                conversationType: "date",
            }})

        } else {
            if (!currentUser.likes.includes(likedUser.id)){
                currentUser.likes.push(likedUser.id)
                likedUser.liked_by.push(currentUser.id)
                currentUser.save()
                likedUser.save()
            }
            // When liked user hasn't liked current user -> add current to likedby list of liked user,
            // and add liked to likes of current user
        }
         res.status(200).json({});
    }
    catch (err) {
        res.status(400).json({ error: "Error in finding user" });
    }
});

app.post('/api/matches/pass/:currentUser&:UserthatwasPassed', async (req, res) => {
    // When current user passes another user (liked) we update both of their arrays/ properties
    const currentUser = await User.findById({_id: req.params.currentUser}).exec()
    const passedUser = await User.findById({_id: req.params.UserthatwasPassed}).exec()
    let likesindex = currentUser.likes.indexOf(passedUser.id)
    let matchindex = currentUser.matched.indexOf(passedUser.id)
    let passedindex = currentUser.passed.indexOf(passedUser.id)

    if (matchindex <= -1){
        if (passedindex <= -1){
            // User not already passed
            currentUser.passed.push(passedUser.id)
        }
        if (likesindex > -1){
            // If user was previously liked, then pass on them now and remove them from the likes list
            currentUser.likes.splice(likesindex, 1)
        }
        currentUser.save()
        res.status(200).json({});
    } else {
        res.status(400).json({error: "User is matched, cannot pass"});
    }
});


app.get('/api/matches/:userId', auth, async (req, res) => {
    try {
        const oid = mongoose.Types.ObjectId(req.params.userId);
        // get the user by id
        const user = await User.findById({ _id: oid });
        //get all liked id list
        const id_list = [];
        //filter the passed profiles by user (in any case user id is in likes but also passed by the user)
        user.likes.forEach(id => {
            if (!user.passed.includes(id)) {
                id_list.push(mongoose.Types.ObjectId(id))
            }
        });
        //get all profiles with ids in liked list, they also like this user and user not passed by them (matched users)
        let ret_users = await User.find({ _id: { $in: user.likes }, likes: req.params.userId, passed: { $ne: req.params.userId } },
            { _id: 1, firstname: 1, lastname: 1, cancer_types: 1, location: 1 })
        res.status(200).json({ users: ret_users });
    }
    catch (err) {
        res.status(400).json({ error: "Error in matches" });
    }
});



//match when somebody likes someone
app.post('/api/match-by-like/:likedUserId/:userWhoLikedId', async (req, res) => {
    let {likedUserId, userWhoLikedId} = req.params;
    if((likedUserId.length === 12 || likedUserId.length === 24) && (userWhoLikedId.length === 12 || userWhoLikedId.length === 24 )) {
    try {
        //we are pushing userWholiked into liked user array
        const updatedLikedUser = await User.findByIdAndUpdate(likedUserId, {$push:{liked_by: userWhoLikedId}}, {new: true});
        //we are pushing likedUser into likes user array
        const updatedUserWhoLiked = await User.findByIdAndUpdate(userWhoLikedId, {$push:{likes: likedUserId}}, {new: true});
        //getting new user
        const userWhoLiked = await User.findById(userWhoLikedId);
        //checking match
        const checkMatch = userWhoLiked.liked_by.find(like => like === likedUserId);
        if(checkMatch !== undefined && checkMatch.length > 0) {
            return res.json({match: true, updatedLikedUser, updatedUserWhoLiked });
        } else {
            return res.json({match: false, updatedLikedUser, updatedUserWhoLiked})
        }
    } catch (error) {
        return res.status(500).json({error});
    }
    } else {
        return res.status(400).json("Invalid Id's. Only Mongo Object id is acceptable");
    }
});


//match by location
app.get('/api/match-by-location/:uid', async (req, res) => {
    const {uid} = req.params;
    // const {location : {latitude, longitude}} = req.body;
    let radius = 30;

    if((uid.length === 12 || uid.length === 24) && (uid.length === 12 || uid.length === 24 )) {
        try {
            //getting matched users
            const userLookingForMatch = await User.findOne({_id: uid})
            const {latitude, longitude} = userLookingForMatch.location.toJSON();
            let allMatchedUsersLean = []
            if(userLookingForMatch) {
                const allMatchedIds = userLookingForMatch.liked_by;
                let allMatchedUsersCalls = []
                allMatchedIds.map(id => allMatchedUsersCalls.push(User.findById(id).lean()))
                allMatchedUsersLean = await Promise.all(allMatchedUsersCalls)
            }
            let nearbyUsersLean = [];
            //getting all users
            let matched = []
            let passed = []
            let likes = []
            let liked_by = []
            if (userLookingForMatch.passed.length > 0){
                passed = await User.find({_id: {$in: userLookingForMatch.passed}}).exec();
            }
            if (userLookingForMatch.matched.length > 0){
                matched = await User.find({_id: {$in: userLookingForMatch.matched}}).exec();
            }
            if (userLookingForMatch.likes.length > 0){
                likes = await User.find({_id: {$in: userLookingForMatch.likes}}).exec();
            }
            if (userLookingForMatch.liked_by.length > 0){
                liked_by = await User.find({_id: {$in: userLookingForMatch.liked_by}}).exec();
            }
            const dontinclude = []
                .concat(passed, matched, [uid], likes, liked_by)
            const usersLean = await User.find({_id: {$nin : dontinclude}}).lean();
            //filtering users on the basis of latitide and longitude
            usersLean.map(user => {
                //calculating the distance bw the given latitudes and longitudes
                let distance = getDistanceFromLatLonInKm(
                    latitude,
                    longitude,
                    user.location.latitude,
                    user.location.longitude
                )
                if (distance <= radius) {
                //pushing to array if user has distance within the radius
                    nearbyUsersLean.push(user)
                }
            })
            // Process returned user objects
            for (let i = 0; i < allMatchedUsersLean.length; i++) {
                processUser(allMatchedUsersLean[i])
            }
            for (let i = 0; i < nearbyUsersLean.length; i++) {
                processUser(nearbyUsersLean[i])
            }
            return res.json( [...allMatchedUsersLean, ...nearbyUsersLean] )
        } catch (error) {
            return res.status(500).json({error})
        }
    } else {
        return res.status(400).json("Invalid Id's. Only Mongo Object id is acceptable")
    }
});


app.post('/api/admin', async (req, res) => {
    filterjson = {}
    if (req.body.genders){
        filterjson.gender = checkList(req.body.genders)
    }
    if (req.body.sexualOrientations){
        filterjson.sexual_orientation = checkList(req.body.sexualOrientations)
    }
    if (req.body.cancerTypes){
        filterjson.cancer_types = checkList(req.body.cancerTypes)
    }
    if (req.body.treatments){
        filterjson.treatments = checkList(req.body.treatments)
    }
    if (req.body.medications){
        filterjson.medications = checkList(req.body.medications)
    }
    if (req.body.isMentor){
        filterjson.is_mentor = checkList(req.body.isMentor)
    }
    if (req.body.isMentee){
        filterjson.is_mentee = checkList(req.body.isMentee)
    }
    if (req.body.isPartner){
        filterjson.is_partner = checkList(req.body.isPartner)
    }
    const results = await User.find(filterjson)
    let emails = []
    for (let i = 0; i < results.length; i++){
        const diff = Date.now() - new Date(results[i]["birthday"])
        const dt = new Date(diff)
        const age = Math.abs(dt.getUTCFullYear() - 1970)
        if (req.body.ageRange){
            if (age >= req.body.ageRange[0] && age <= req.body.ageRange[1]){
                emails.push(results[i]["email"]);
            }
        } else{
            emails.push(results[i]["email"])
        }
    }
    res.send(emails)
});

function checkList(item){
    if (typeof item == "object"){
        return {$in: item}
    } else{
        return {$in: [item]}
    }
}

//location formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Radius of the earth in km
    const Latitude = deg2rad(lat2 - lat1) // deg2rad below
    const Longitude = deg2rad(lon2 - lon1)
    const a = Math.sin(Latitude / 2) * Math.sin(Latitude / 2) + 
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(Longitude / 2) * Math.sin(Longitude / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

//converts degrees to radians
const deg2rad = (degree) => {
    return degree * (Math.PI / 180);
}

server = app.listen(5000, () => console.log('Success, Server is up and running!'));


const io = socket(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    socket.on('joinUserSocket', ({userId}) => {
        socket.join(userId);
    })

    socket.on('newConversation', (conversationData, callback) => {
        try {
            io.to(conversationData.userIdOne).to(conversationData.userIdTwo).emit("sendMatch", {conversation: conversationData})
            callback({error: false})
        } catch (e) {
            callback({error: e});
        }
    })

    socket.on('join', async ({conversationId, userId}, callback) => {
        try {
            let conversation = await Conversation.findById(conversationId);
            if(!conversation) {
                return callback(e);
            }
            let messages = conversation.messages.sort((m1, m2) => m2.createdAt - m1.createdAt);
            let count = 0;
            messages = messages.filter(msg => {
                if (count < 10) {
                  count++;
                  return true;
                }
                return false;
              });
            messages.reverse();
            
            socket.userId = userId;
            socket.activeRoom = conversationId
            
            const areMessagesLeft = count >= 10
            socket.emit('messages', {messages, isNew: false, areMessagesLeft});

            socket.join(conversationId);
            callback({error: false});
        } catch (e) {
            callback({error: e});
        }
    });

    socket.on('sendMessage', async ({content, author}, callback) => {
        try{
            const new_message = {author, content};
            let conversation = await Conversation.findById(socket.activeRoom);
            conversation.messages.push(new_message);
            await conversation.save();
            let messages = conversation.messages.toObject();
            const edited_message = messages[messages.length - 1];
            io.to(socket.activeRoom).emit('messages', {messages: [edited_message], isNew: true, areMessagesLeft: 'not applicable'});
            callback({error: false});
        } catch(e) {
            callback({error: e});
        }

      })

    socket.on('latestMessages', async (_id, callback) => {
        try {
            let conversation = await Conversation.findById(socket.activeRoom);
            if(!conversation) {
                return callback(e);
            }
            let messages = conversation.messages.sort((m1, m2) => m2.createdAt - m1.createdAt);
            let count = 0;
            let idFound = false; 
            messages = messages.filter(msg => {
                if (count < 10 && idFound) {
                  count++;
                  return true;
                } else if (msg._id == _id) {
                    idFound = true;
                }
                return false;
              });
            messages.reverse();

            const areMessagesLeft = count == 10
            socket.emit('messages', {messages, isNew: false, areMessagesLeft});
            callback({error: false});
        } catch (e) {
            callback({error: e})
        }
    })

});


