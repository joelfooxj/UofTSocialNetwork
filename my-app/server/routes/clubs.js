const express = require('express')
const router = express.Router()
const { Club } = require('../../models/Club')
const { ObjectID } = require('mongodb')

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
router.post('/create', (req, res) => {
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
        newClub.profilePicture = req.body.profilePicture
    }

    if (req.body.bannerImage) {
        newClub.bannerImage = req.body.bannerImage
    }

    newClub.save().then((result) => {
        res.status(200).send(newClub)
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })
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
router.patch('/update/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id) || !req.body.attr || !req.body.nVal) {
        res.status(400).send()
        return;
    }

    const update = {
        [req.body.attr]: req.body.nVal
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