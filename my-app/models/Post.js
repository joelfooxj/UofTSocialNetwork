/* User model */
'use strict';

const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    posterID: {
        type: ObjectID,
        required: true,
        minlength: 1
    },
    title: {
        type: String,
        required: false,
        minlength: 1,
        trim: true
    },
    content: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: String,
        require: true,
        minlength: 8
    },
    image: {
        data: Buffer,
        contentType: String
    },
    location: {
        type: String,
        require: false,
        minlength: 1,
        trim: true
    }
})

// make a model using the User schema
//FIRST ARGUMENT TO MODEL IS THE COLLECTION NAME!!!
//It will change it to be '1st arg' + 's'
const Post = mongoose.model('Post', PostSchema)
module.exports = { Post }