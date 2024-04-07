const mongoose = require('mongoose');

let articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    super: {
        type: Boolean,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        required: true
    },
    approved: {
        type: Boolean,
        required: true
    }
})

const Articledb = mongoose.model('articledb', articleSchema);

module.exports = Articledb;