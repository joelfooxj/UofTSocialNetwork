const express = require('express')
const router = express.Router()
const { Post } = require('../../models/Post.js')
const { ObjectID } = require('mongodb')
const fs = require('fs');
const { sessionChecker} = require('../mainServer')

/* post request for adding a new post
 *
 * req body expects:
 *     - posterID: id of poster
 *     - content: post content
*/
router.post('/makePost', (req, res) => {
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
        res.status(400).send(newPost)
    })
})

/* route for getting posts based on an id
 *
 * req body expects:
 *     - nothing
*/
router.get('/getPost/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Post.find({"posterID": new ObjectID(id)}).then((posts) => {
        res.status(200).send(posts)
    }).catch((err) => {
        console.log(err)
        res.status(400).send()
    })
})

/* route for getting posts based on a set of ids
 *
 * req body expects:
 *     - ids: array of ids to get posts from
*/
router.get('/getPostSet', (req, res) => {
    const ids = req.body.ids;

    for (let i = 0; i < ids.length; i++) {
        if (!ObjectID.isValid(ids[i])) {
            res.status(400).send()
            return;
        }
    }

    Post.find({"posterID": {$in: ids.map(x => {
        new ObjectID(x)
    })}}).then((posts) => {
        res.status(200).send(posts)
    }).catch((error) => {
        console.log(error)
        res.status(400).send()
    })
})

/* delete a post based on id
 *
 * req body expects:
 *     - nothing
*/
router.delete('/removePost/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Post.findOneAndDelete({"_id": new ObjectID(id)}).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.status(200).send()
        }
    }).catch((err) => {
        console.log(err)
        res.status(400).send()
    })
})

/* patch request for updating a post
 *
 * req body expects:
 *     - posterID: id of poster
 *     - any previous elements in the post (updated or not)
*/
router.patch('/updatePost/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid()) {
        res.status(400).send()
        return;
    }

    Post.findById(id).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            if (req.body.title) {
                post.title = req.body.title
            }

            if (req.body.content) {
                post.title = req.body.content
            }

            if (req.body.location) {
                post.location = req.body.location
            }

            return post.save()
        }
    }).then((res) => {
        res.status(200).send()
    }).catch((err) => {
        console.log(err)
        res.status(400).send()
    })
})

module.exports = router