// Schemas related to the data for user router. This can be changed.
// More data can be added here

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true,
        min: 6, // not sure if we need this but can be changed
        max: 255
    },
    lastname: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    //username: {type: String, unique: true}, --> Do we need username?
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('User', UserSchema);