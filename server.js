/* main server for our application*/
'use strict';

const log = console.log
const path = require('path')

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

// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 300000,
        httpOnly: true
    }
}));


//routes
const userRoutes = require('./routes/users')
const postRoutes = require('./routes/posts')
const clubRoutes = require('./routes/clubs')
app.use('/users', userRoutes)
app.use('/clubs', clubRoutes)
app.use('/posts', postRoutes)

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues
const { User } = require('./models/SessionUser')


// to validate object IDs
const { ObjectID } = require('mongodb')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

//----------------------------------------------------------------------


//Middleware to check for active users on session cookie
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/'); //TODO: redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};


//POST - Log In
app.post('/log_in', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    if(username === "" || password === ""){
        res.status(400).send()
        return;
    }

    // Use the static method on the User model to find a user
    // by their username and password
	User.findByUsernamePassword(username, password).then((user) => {
	    if (!user) {
            res.status(404).send();
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            res.status(200).send(user);
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send();
    })
})

//DELETE - Log Out
app.delete('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
            console.log(error) //FOR DEV PURPOSES ONLY
			res.status(500).send()
		} else {
			res.redirect('/')
		}
	})
})


//GET - for checking if user is logged in
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.status(200).send({ currentUser: req.session.user});
    } else {
        res.status(401).send();
    }
});

app.use(express.static(__dirname + "/client/build"));
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

module.exports.auth = (req, res, next) => {
    //req.session.user actually stores the user id
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

module.exports.authAdmin = (req, res, next) => {
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user || (user && user.permissions === 0)) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

//start server
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})
