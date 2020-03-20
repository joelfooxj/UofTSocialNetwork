/* main server for our application*/
'use strict';

const log = console.log

//.env file load
require('dotenv').config()

//express
const express = require('express')
const app = express();

//parsers and session 
const bodyParser = require('body-parser') 
const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }));

//cors
const cors = require('cors');
app.use(cors())

//routes
const userRoutes = require('./routes/users')
app.use('/users', userRoutes)

// mongoose and mongo connection
const { mongoose } = require('../db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues


// to validate object IDs
const { ObjectID } = require('mongodb')


//----------------------------------------------------------------------

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

//Middleware to check for active users on session cookie
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/'); //TODO: redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

//start server
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})