const express = require('express')
const router = express.Router()
const { User } = require('../models/SessionUser')
const { ObjectID } = require('mongodb')
const security = require('../server')

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
        timelineOpts: [true, false, false]
    })

    user.save().then(() => {
        res.status(200).send(user)
    }, (err) => {
        if(err.code === 11000){
            const dupField = err.message.split("{")[1].split(":")[0]
            res.statusMessage = dupField.trim()
            res.status(409).send()

            return
        }else{
            res.status(400).send(err)
            return
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })
})

//[GET] - Get user with username and password
router.get('/findUserByName/:username', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const username = req.params.username

    if(username === ""){
        res.status(400).send()
        return;
    }

    User.find({username: username})
    .then((user) => {
	    if(!user){
            res.status(404).send()
        }
        else{
            res.status(200).send(user)
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})

//[GET] - Get user with given object id
router.get('/findUserByID/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = new ObjectID(req.params.id)

    if(!ObjectID.isValid(id)){
        res.status(400).send()
        return;
    }

    User.findOne({_id: id}).then((user) => {
	    if(!user){
            res.status(404).send()
        }
        else{
            res.status(200).send(user)
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})


//[GET] - Gets all users IDs
router.get('/allUsers', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    User.find().then((users) => {
	    if(!users){
            res.status(404).send()
        }
        else{
            res.status(200).send(users)
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})

//[DELETE] - delete user
router.delete('/delete', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.body.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;
	}

    User.deleteOne({_id: id}).then((result) => {
	    if(!result){
            res.status(500).send()
        }
        else{
            res.status(200).send(result)
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})


//[PATCH] - ban user
router.patch('/ban', (req, res, next) => {security.authAdmin(req, res, next)}, (req, res) => {
    const id = req.body.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;
	}

    const update = {
        status: 0
    }

    User.findOneAndUpdate({_id: id}, update).then((result) => {
	    if(!result){
            res.status(500).send()
        }
        else{
            res.status(200).send()
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})

//[PATCH] - ban user
router.patch('/unban', (req, res, next) => {security.authAdmin(req, res, next)}, (req, res) => {
    const id = req.body.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;
	}

    const update = {
        status: 1
    }

    User.findOneAndUpdate({_id: id}, update).then((result) => {
	    if(!result){
            res.status(500).send()
        }
        else{
            res.status(200).send()
        }
    }).catch((error) => {
        console.log(error) //FOR DEV PURPOSES ONLY
		res.status(500).send()
    })
})

//[PATCH] - update user info
router.patch('/update', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.body.id

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;
    }
    else if(req.body.propertyName === "" || req.body.propertyVal === ""){
        res.status(400).send()
        return;
    }

    const update = {
        [req.body.propertyName]: (req.body.propertyVal)
    }

    User.findOneAndUpdate({_id: id}, update).then((result) => {
	    if(!result){
            res.status(500).send()
        }
        else{
            res.status(200).send(result)
        }
    }).catch((err) => {
        if(err.code === 11000){
            const dupField = err.message.split("{")[1].split(":")[0]
            res.statusMessage = dupField.trim()
            res.status(409).send()

            return
        }else{
            res.status(500).send(err)
            return
        }
    })
})

//[PUT] - replace the current doc with the same doc with a different password
router.put('/updatePass', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.body.id
    const pass = req.body.pass

    if (!ObjectID.isValid(id)) {
		res.status(404).send()  
		return;
    }

    User.findById(req.body.id, function (err, doc){
        if(err){
            console.log("Error updating password.")
            res.status(500).send()
            return;
        }
        else{
            doc.password = pass
            doc.save().then(() => {
                res.status(200).send()
            }, (err) => {
                console.log(err)
                res.status(400).send(err)
            }).catch((err) => {
                console.log(err)
                res.status(500).send()
            })
        }
    })
})

module.exports = router
