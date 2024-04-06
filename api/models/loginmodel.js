const mongoose = require('mongoose');

let loginSchema = new mongoose.Schema({
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
        type: String,
        required: true
    },
    editor: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
})

const Userdb = mongoose.model('userdb', loginSchema);

module.exports = Userdb;