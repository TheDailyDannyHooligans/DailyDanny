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
    status: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    authorid: {
        type: String,
        required: true
    }
})

const Articledb = mongoose.model('articledb', articleSchema);

module.exports = Articledb;