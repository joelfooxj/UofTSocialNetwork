const express = require('express')
const router = express.Router()
const { Club } = require('../../models/Club')
const { ObjectID } = require('mongodb')
const fs = require('fs');

// routes here
// [GET] get all clubs
router.get('/all', (req, res) => {
    Club.find().then((clubs) => {
        res.send(clubs)
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })
})

/* [POST] add new clubs
 *
 * req body expects:
 *     - name: name of the new club
*/
router.post('/create', async (req, res) => {
    if (!req.body.name) {
        res.status(400).send()
        return;
    }

    const newClub = new Club({
        name: req.body.name,
        execs: [],
        requested: [],
        members: []
    })

    if (req.body.profilePicture) {
        let data = await fs.readFile(req.body.profilePicture)
        let b64 = data.toString('base64')
        let img = new Buffer(b64, 'base64')
        newClub.profilePicture = img
    }

    if (req.body.bannerImage) {
        let data = await fs.readFile(req.body.bannerImage)
        let b64 = data.toString('base64')
        let img = new Buffer(b64, 'base64')
        newClub.bannerImage = img
    }
    try {
        await newClub.save()
        res.status(200).send(newClub)
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

// [GET]retrieve single club info by id
router.get('/get/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Club.findById(id).then((club) => {
        if (!club) {
            res.status(404).send()
        } else {
            res.status(200).send(club)
        }
    }).catch((err) => {
        console.log(err)
        res.status(500).send()
    })
})

/* [PATCH] update club info
 * 
 * req body expects:
 *     - attr: attribute to update
 *     - nVal: new value to set attribute to
 *
 */
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id) || !req.body.attr || !req.body.nVal) {
        res.status(400).send()
        return;
    }

    let new_val = req.body.nVal
    if (req.body.attr === 'profilePicture' || req.body.attr === 'bannerImage') {
        let data = await fs.readFile(req.body.nVal)
        let b64 = data.toString('base64')
        let img = new Buffer(b64, 'base64')
        new_val = img
    }

    const update = {
        [req.body.attr]: new_val
    }

    Club.findOneAndUpdate({_id: id}, update).then((result) => {
        if (!result) {
            req.status(404).send()
        } else {
            res.status(200).send(result)
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })

})

// [DELETE] delete a club 
router.delete('/remove/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    Club.findOneAndDelete({"_id": new ObjectID(id)}).then((post) => {
        if (!post) {
            res.status(404).send()
        } else {
            res.status(200).send()
        }
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })

})

module.exports = router