/* server.js - user & resource authentication */
'use strict';

const log = console.log
require('dotenv').config()

const express = require('express')
const app = express();
const bodyParser = require('body-parser') 
// express-session for managing user sessions
const session = require('express-session')

app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors())

// starting the express server
// mongoose and mongo connection
const { mongoose } = require('../db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues

const { User } = require('../models/SessionUser')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object







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




//--------------------------------------USER MANAGEMENT ROUTES-----------------------------------
app.post('/user', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        permissions: req.body.permissions,
        clubsExecOf: [],
        clubsMemberOf: [],
        clubsFollowing: [],
        clubsAwaitingJoin: [],
        timelineOpts: []
    })

    user.save().then(() => {
        res.status(200).send(user)
    }, (err) => {
        console.log(err)
        res.status(400).send(err)
    })

})

//--------------------------------------AUTHENTICATION ROUTES-----------------------------------
/*
// A route to login and create a session
app.post('/use', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	Logged_In_User.findByUsernamePassword(username, password).then((user) => {
	    if (!user) {
            res.redirect('/');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email
            res.redirect('/dashboard');
        }
    }).catch((error) => {
		res.status(400).redirect('/');
    })
})

// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})
*/

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})