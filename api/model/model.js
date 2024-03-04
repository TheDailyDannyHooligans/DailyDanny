const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    editor: {
        type: Boolean,
        required: true
    },
    user: {
        type: Boolean,
        required: true
    }
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;