const express = require('express')
const router = express.Router()
const { User } = require('../../models/SessionUser')

//POST - Create new user
router.post('/create', (req, res) => {
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

//GET - Get user with username and password
router.get('/user', (req, res) => {
    const username = req.body.username
    const pass = req.body.password

    if(username === "" || pass === ""){
        res.status(400).send()
        return;
    }

    User.findByUsernamePassword(username, pass).then((user) => {
	    if(!user){
            res.status(404).send()
        }
        else{
            res.status(200).send()
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})

//POST - Log In
router.post('/log_in', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    if(username === "" || password === ""){
        res.status(500).send()
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
            req.session.username = user.username
            res.status(200).send();
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send();
    })
})

//DELETE - Log Out
router.delete('/logout', (req, res) => {
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

module.exports = router


