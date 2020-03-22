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
        status: 1,
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



module.exports = router


