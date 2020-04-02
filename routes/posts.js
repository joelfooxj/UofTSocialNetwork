const express = require('express')
const router = express.Router()
const { Post } = require('../models/Post.js')
const { ObjectID } = require('mongodb')
const security = require('../server')


/* post request for adding a new post
 *
 * req body expects:
 *     - posterID: id of poster
 *     - content: post content
*/
router.post('/create', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    if (!req.body.posterID || !req.body.content) {
        res.status(400).send()
        return;
    }

    const newPost = new Post({
        posterID: req.body.posterID,
        content: req.body.content,
        date: new Date()
    })

    if (req.body.title) {
        newPost.title = req.body.title
    }

    if (req.body.location) {
        newPost.location = req.body.location
    }

    newPost.save().then((result) => {
        res.status(200).send(newPost)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(newPost)
    })
})

/* get request for getting all posts
 *
 * req body expects:
 *     - nothing
*/
router.get('/all', (req, res) => {
    Post.find().then((posts) => {
        res.send(posts)
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
})

/* route for getting posts based on an id
 *
 * req body expects:
 *     - nothing
*/
router.get('/get/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Post.find({"posterID": new ObjectID(id)}).then((posts) => {
        res.status(200).send(posts)
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })
})

/* delete a post based on id
 *
 * req body expects:
 *     - nothing
*/
router.delete('/remove/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Post.findOneAndDelete({"_id": new ObjectID(id)}).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.status(200).send(post)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })
})

/* patch request for updating a post
 *
 * req body expects:
 *     - attr: attribute we wish to update
 *     - nVal: new value of attribute
*/
router.patch('/update/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    } else if (req.body.propertyName === "" || req.body.propertyVal === "") {
        res.status(400).send()
        return;
    }

    const update = {
        [req.body.attr]: req.body.nVal
    }

    Post.findOneAndUpdate({_id: id}, update).then((result) => {
        if (!result) {
            res.status(404).send()
        } else {
            res.status(200).send(result)
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
})

module.exports = router
