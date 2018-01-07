const express = require('express')
const router = express.Router()
const Bands = require('../db/models/Band')

// GET BANDS LISTINGS
router.get('/bands', (req, res, next) => {
    res.render('bands/index.hbs')
    })

module.exports = router
