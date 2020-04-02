const express = require('express')
const router = express.Router()
const { Club } = require('./../models/Club')
const { ObjectID } = require('mongodb')
const security = require('../server')

// multipart middleware: allows access to uploaded files from req.file
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()

// Cloudinary
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

// default photos for club
const DEF_AVI_URL = process.env.DEF_AVI_URL
const DEF_AVI_ID = process.env.DEF_AVI_ID
const DEF_BANNER_URL = process.env.DEF_BANNER_URL
const DEF_BANNER_ID = process.env.DEF_BANNER_ID

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
 *     - clubInfo: info text of this club
*/
router.post('/create', (req, res, next) => {security.auth(req, res, next)}, async (req, res) => {
    if (!req.body.name) {
        res.status(400).send()
        return;
    }

    const newClub = new Club({
        name: req.body.name,
        clubInfo: req.body.clubInfo,
        execs: [],
        requested: [],
        members: [],
        profilePicture: DEF_AVI_URL,
        profilePictureID: DEF_AVI_ID,
        bannerImage: DEF_BANNER_URL,
        bannerImageID: DEF_BANNER_ID
    })

    newClub.save().then(() => {
        res.status(200).send(newClub)
    }, (err) => {
        if (err.code === 11000) {
            const dupField = err.message.split('{')[1].split(":")[0]
            res.statusMessage = dupField.trim()
            res.status(409).send()
        } else {
            res.status(400).send(err)
        }
    }).catch(err => {
        console.log(err)
        res.status(500).send()
    })
})

// [GET] retrieve single club info by id
router.get('/get/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
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
 * Please note that this function should be used to 
 * update attributes that are *NOT* images. Use the 
 * /updateImg/:id route for that purpose.
 */
router.patch('/update/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.params.id
    if (!ObjectID.isValid(id) || !req.body.attr || !req.body.nVal) {
        console.log(ObjectID.isValid(id), req.body.attr, req.body.nVal)
        res.status(400).send()
        return;
    }

   const update = {
        [req.body.attr]: req.body.nVal
    }

    Club.findOneAndUpdate({_id: id}, update).then((result) => {
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

/* [PATCH] update club info
 * 
 * req body expects:
 *     - attr: attribute to update
 *     - nVal: new value to set attribute to
 */
router.patch('/updateImg/:id/:attr', (req, res, next) => {security.auth(req, res, next)}, multipartMiddleware, (req, res) => {
    const id = req.params.id
    const attr = req.params.attr

    if (!ObjectID.isValid(id) || (attr !== 'profilePicture' && attr !== 'bannerImage')) {
        res.status(400).send()
        return;
    }

    let obj = {}
    let img_id = -1;

    cloudinary.uploader.upload(
        req.files.image.path,
        function (result) {
            const update = {
                [attr]: result.url,
                [`${attr}ID`]: result.public_id
            }

            Club.findOneAndUpdate({_id: id}, update).then((result) => {
                if (!result) {
                    obj.status = 400
                } else {
                    obj.status = 200
                    img_id = result[`${attr}ID`]
                }
            }).then((result) => {
                if (img_id !== DEF_AVI_ID && img_id !== DEF_BANNER_ID) {
                    cloudinary.uploader.destroy(img_id, function (result) {
                        res.status(obj.status).send()
                    })
                }
            }).catch((error) => {
                console.log(error)
                obj.status = 500
            })
        }
    )
})

// [DELETE] delete a club 
router.delete('/remove/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        res.status(400).send()
        return;
    }

    let obj = {}
    let avi_id = -1
    let banner_id = -1
    Club.findOneAndDelete({"_id": new ObjectID(id)}).then((post) => {
        if (!post) {
            obj.status = 404
        } else {
            obj.status = 200
            avi_id = post.profilePictureID
            banner_id = post.bannerImageID
        }
    }).then((result) => {
        if (avi_id !== DEF_AVI_ID) {
            cloudinary.uploader.destroy(avi_id)
        } 

        if (banner_id !== DEF_BANNER_ID) {
            cloudinary.uploader.destroy(banner_id)
        }

        res.status(obj.status).send()
    }).catch((error) => {
        console.log(error)
        res.status(500).send()
    })

})

module.exports = router