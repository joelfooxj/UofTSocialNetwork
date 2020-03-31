'use strict';

const mongoose = require('mongoose')
const { ObjectID } = require('mongodb')

const ClubSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    clubInfo: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    execs: [ObjectID],
    requested: [ObjectID],
    members: [ObjectID],
    profilePicture: String,
    profilePictureID: String,
    bannerImage: String,
    bannerImageID: String
})

const Club = mongoose.model('Club', ClubSchema)
module.exports = { Club }