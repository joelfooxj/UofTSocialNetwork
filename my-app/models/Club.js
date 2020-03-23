'use strict';

const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const ClubSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 1,
        trim: true
    },
    execs: [ObjectID],
    requested: [ObjectID],
    members: [ObjectID],
    profilePicture: String, // String with local path for now, need to figure out images
    bannerImage: String, // same as above
})

const Club = mongoose.model('Club', ClubSchema)
module.exports = { Post }