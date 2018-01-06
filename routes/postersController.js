const express = require('express')
const router = express.Router({mergeParams: true})
const Poster = require('../db/models/Poster')


module.exports = router