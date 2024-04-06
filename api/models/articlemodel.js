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
    imageids: [String],
})

const Articledb = mongoose.model('articledb', articleSchema);

module.exports = Articledb;