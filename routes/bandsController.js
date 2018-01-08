const express = require('express')
const router = express.Router()
const User = require('../db/models/User')
const Band = require('../db/models/Band')

// GET BANDS LISTING
router.get('/', (req, res) => {
    console.log("Get bands")
    Band.find({})
        .then((bands) => {
            res.render('bands/index', {
                bands,
                pageTitle: 'Bands'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// CREATE A NEW BAND
router.get('/new', (req, res) => {
    res.render('bands/new', { pageTitle: 'New Band' })
})

router.post('/', (req, res) => {
    const newBand = req.body
    if (!newBand.imageUrl) {
        newBand.imageUrl = 'http://ultimateclassicrock.com/files/2015/06/Spinal-Tap-630x420.jpg'
    }

    Band.create(newBand)
        .then(() => {
            res.redirect('/bands')
        })
        .catch((error) => {
            console.log(error)
        })
})

// SHOW A BAND
// router.get('/:bandId', (req, res) => {
//     console.log("Get one band")
//     const BandId = req.params.bandId

//     Band.findById(bandId)
//         .then((user) => {
//             res.render('bands/show.hbs', {
//                 band,
//                 pageTitle: Band.bandName
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// EDIT A BAND
// router.get('/:bandId/edit', (req, res) => {
//     const bandId = req.params.bandId


//     Band.findById(bandId)
//         .then((band) => {
//             res.render('bands/edit.hbs', {
//                 band,
//                 pageTitle: 'Band_Update'
//             })
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// DELETE A BAND
// router.get('/:bandId/delete', (req, res) => {
//     const bandId = req.params.bandId


//     Band.findByIdAndRemove(bandId)
//         .then(() => {
//             res.redirect('/bands')
//         })
//         .catch((error) => {
//             console.log(error)
//         })
// })

// SHOW UPDATED BAND
// router.put('/:bandId', (req, res) => {
//     const updatedBandInfo = req.body
//     const bandId = req.params.bandId


//     Band.findByIdAndUpdate(bandId, updatedBandInfo, { new: true })
//         .then(() => {
//             res.redirect(`/bands/${bandId}`)
//         })
// })

module.exports = router
