const express = require('express')
const router = express.Router()
const { Club } = require('../../models/Club')
const { ObjectID } = require('mongodb')

// routes here
// [GET] get all clubs
// [POST] add new clubs
// [GET]retrieve single club info by id
// [PATCH] update club info
// [DELETE] delete a club 

module.exports = router