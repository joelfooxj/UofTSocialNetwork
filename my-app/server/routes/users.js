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

//POST - Log In
router.post('/use', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their username and password
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

//DELETE - Log Out
router.delete('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})

module.exports = router


