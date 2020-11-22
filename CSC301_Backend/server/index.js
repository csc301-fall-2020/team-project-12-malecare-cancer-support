const express = require("express");
const app = express();
//----------------------------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const crypto = require('crypto');
const createHash = crypto.createHash;

mongoose.connect('mongodb://localhost:27017/cancer', {useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new Schema({
    email: String,
    displayName: String, //can be changed to full name
    hashedPassword: String,
    salt: String,

});

UserSchema //for setting and getting the password
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._password;
    });

UserSchema.methods = {

    makeSalt: function(){ //makes the random salt code
        return crypto.randomBytes(16).toString('base64');
    },

    authenticate: function(plainText) {
        return this.encryptPassword(plainText) == this.hashedPassword; //authenticates the password using the database
    },

    encryptPassword: function(password){ //function to encrypt the password
        if(!password || !this.salt) return '';
       // var salt = new Buffer(this.salt, 'base64');
       var salt = Buffer.from(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');
    }

};

const User = mongoose.model('User',UserSchema);

//const kitty = new Cat({ name: 'Zildjian' });
//kitty.save().then(() => console.log('meow'));
//---------------------------------------------

const seed = () => {
    //User.find({}).remove().then(()=>{
    User.find({}).deleteMany().then(()=>{    
        const users = [{
            email: 'alice@example.com',
            displayName: 'Alice',
            password: '123123',
        }, {
            email: 'bob@example.com',
            displayName: 'Bob',
            password: '321321',
            
        }];

        User.create(users, (err, users_) =>{//creates users
            console.log('MONGODB SEED: '+  users_.length +' Users created.');
        });

    }); //query all users like in sql
};

//--------------------------------------------
app.get('/', function(req,res){
    User.find({}, (err, users) => {
        res.json(users);
    });
});

seed();

app.listen(3000);