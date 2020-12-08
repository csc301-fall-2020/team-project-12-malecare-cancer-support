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
    try {
        const currentUser = await User.findById({_id: req.params.userId}).exec()
        let arr = [currentUser.id]
        const dont_find = arr.concat(currentUser.passed)
        const all_users = await User.find({ _id: { $nin: dont_find}}).exec()
        let options = []
        options = options.concat(currentUser.liked_by, all_users, currentUser.passed)
        let ret_users;
        if (options.length >= 5) {
            ret_users = options.slice(0, 5);
        } else{
            ret_users = options.slice(0, options.length);
        }
        res.send(ret_users)
        // if (currentUser.liked_by.length !== 0){
        //     for (let i = 0; i < currentUser.liked_by.length; i++){
        //         if (!currentUser.passed.includes(currentUser.liked_by[i])){
        //             ret_users.push(currentUser.liked_by[i])
        //         }
        //     }
        // }
        // if (ret_users.length < 5){
        //     const all_users = await User.find({}).exec()
        //     let count = 0
        //     do {
        //         console.log(currentUser.id)
        //         console.log(all_users[count].id)
        //         if (!currentUser.passed.includes(all_users[count]) || !currentUser.id === all_users[count].id){
        //             ret_users.push(all_users[count])
        //             all_users.splice(count, 1);
        //         }
        //         console.log(all_users)
        //         count++
        //     } while (ret_users.length < 5 && count < all_users.length || all_users.length > 0)
        //     console.log("out")
        //     count = 0
        //     if (ret_users.length < 5 || currentUser.passed.length !== 0){
        //         do{
        //             ret_users.push(currentUser.passed[count])
        //             count += 1
        //         }while(ret_users.length < 5 && count < currentUser.passed.length)
        //     }
        // }
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
        const currentUser = await User.findById({_id: req.params.currentUser}).exec()
        const likedUser = await User.findById({_id:req.params.UserthatwasLiked}).exec()
        if (currentUser.liked_by.includes(likedUser.id)){
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

// user A - 5fcaf1762137ae5a38470903
// A likes [5fcaf1a32137ae5a38470904 ]

// user B - 5fcaf1a32137ae5a38470904

// B liked_by[5fcaf1762137ae5a38470903 ]


