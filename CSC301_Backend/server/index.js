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
app.use('/conversations', conversations);
app.use('/messages', messages);

app.get('/user/:userId', auth, async(req,res) => {
    // const o_id = mongoose.isValidObjectId(req.params.userId);//dont need this
    const oid = mongoose.Types.ObjectId(req.params.userId);
    try {
        const user = await User.findById({_id: oid});
        res.status(200).json({user: user});

    }
    catch (err) {
        res.status(400).json({error: "Error in finding user"});
    }
});



app.get('/all-users', auth, async (req, res) => {
 const users = await User.find()
 res.json({users})
})


//match when somebody likes someone
app.post('/match-by-like/:likedUserId/:userWhoLikedId', auth, async (req, res) => {
 let {likedUserId, userWhoLikedId} = req.params

 if((likedUserId.length === 12 || likedUserId.length === 24) && (userWhoLikedId.length === 12 || userWhoLikedId.length === 24 )) {
 try {
 //we are pushing userWholiked into liked user array
 const updatedLikedUser = await User.findByIdAndUpdate(likedUserId, {$push:{liked_by: userWhoLikedId}}, {new: true})
 //we are pushing likedUser into likes user array
 const updatedUserWhoLiked = await User.findByIdAndUpdate(userWhoLikedId, {$push:{likes: likedUserId}}, {new: true})
 //getting new user
 const userWhoLiked = await User.findById(userWhoLikedId)
 //checking match
 const checkMatch = userWhoLiked.liked_by.find(like => like === likedUserId)
 if(checkMatch !== undefined && checkMatch.length > 0) {
 return res.json({match: true, updatedLikedUser, updatedUserWhoLiked })
 } else {
 return res.json({match: false, updatedLikedUser, updatedUserWhoLiked})
 }
 } catch (error) {
 return res.json({error})
 }
 } else {
 return res.json("Invalid Id's. Only Mongo Object id is acceptable")
 }

})


//match by location
app.post('/match-by-location', auth, async (req, res) => {
 const {location : {latitude, longitude}, radius} = req.body
 try {
 let nearbyUsers = []
 //getting all users
 const users = await User.find()
 console.log('req', latitude, longitude)
 console.log('user loc', (users[0].location.toJSON()))
 //filtering users on the basis of latitude and longitude
 users.map(user => {
 //calculating the distance bw the given latitudes and longitudes
 let distance = getDistanceFromLatLonInKm(
 latitude,
 longitude,
 user.location.toJSON().latitude,
 user.location.toJSON().longitude
 )
 console.log('distance is : ', distance)
 if (distance <= radius) {
 //pushing to array if user has distance within the radius
 nearbyUsers.push(user)
 }
 })
 return res.json( nearbyUsers )
 } catch (error) {
 return res.json({error})
 }

})


const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
 const R = 6371 // Radius of the earth in km
 const Latitude = deg2rad(lat2 - lat1) // deg2rad below
 const Longitude = deg2rad(lon2 - lon1)
 const a =
 Math.sin(Latitude / 2) * Math.sin(Latitude / 2) +
 Math.cos(deg2rad(lat1)) *
 Math.cos(deg2rad(lat2)) *
 Math.sin(Longitude / 2) *
 Math.sin(Longitude / 2);
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
