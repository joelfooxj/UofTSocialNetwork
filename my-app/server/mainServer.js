/* server.js - user & resource authentication */
'use strict';
const log = console.log
require('dotenv').config()

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('../db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { Logged_In_User } = require('../models/SessionUser')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));



// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/'); //TODO: redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};


app.post('/logged_in_users', (req, res) => {
    const user = new Logged_In_User({
        username: "Mark",
        password: "studenttears"
    })

    user.save().then((user) => {
        res.send(user)
    }, (err) => {
        res.status(400).send(err)
    })

})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})

