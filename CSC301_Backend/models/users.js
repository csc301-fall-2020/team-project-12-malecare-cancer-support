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
    },
    birthday: {
        type: Date,
        required: true,
    },
    phone: {
        type: String
    },
    gender: {
        type: String,
        required: true
    },
    sexual_orientation: {
        type: String,
        required: true
    },
    treatments: {
        type: [String],
        //required: true
    },
    cancer_types: {
        type : [String],
        //required: true
    },
    medications: {
        type: [String],
        //required: true
    },
    location: {
        type: Map,
    },
    is_mentor: {
        type: Boolean,
        //required: true
    },
    is_mentee: {
        type: Boolean,
        //required: true
    },
    is_partner: {
        type: Boolean,
        //required: true
    },
    interests: {
        type: [String]
    },
    bio : {
        type: [String],
        required: true
    },
    likes: {
        type: [String]
    },
    liked_by: {
        type: [String]
    },
    matched: {
        type: [String]
    },
    passed: {
        type: [String]
    },
    profileImage:{
        type: String,
        required: true
    },
    conversations: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation'
    }]
});


module.exports = mongoose.model('User', UserSchema);