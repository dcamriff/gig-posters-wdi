const express = require('express')
const router = express.Router({mergeParams: true})
const User = require('../db/models/User')

// GET POSTERS LISTING
router.get('/', (req, res) => {
    const userId = req.params.userId

    User.findById(userId)
    .then((user) => {
        res.render('posters/index.hbs', {
            userFullName: `${user.findName} ${user.lastName}`,
            userId: user._id,
            posters: user.posters,
            pageTitle: 'Posters'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

// CREATE A NEW POSTER
router.get('/new', (req, res) => {
    const userId = req.params.userId

    res.render('posters/new.hbs', {
        userId,
        pageTitle: 'New_Poster'
    })
})

router.get('/:posterId', (req, res) => {
    const userId = req.params.userId
    const posterId = req.params.posterId

    User.findById(userId)
    .then((user) => {
        const poster = user.posters.id(posterId)
        res.render('posters/show.hbs', {
            userId,
            poster,
            pageTitle: 'Poster'
        })
    })
    .catch((error) => {
        console.log(error)
    })
})

router.post('/', (req, res) => {
    const userId = req.params.userId
    const newPoster = req.body

    User.findById(userId)
    .then((user) => {
        user.posters.push(newPoster)
        return user.save()
    })
    .then(() => {
        res.redirect(`/users/${userId}/posters`)
    })
    .catch((error) => {
        console.log(error)
    })
})

router.get('/:posterId/delete', (req, res) => {
    const userId = req.params.userId
    const posterId = req.params.posterId

    User.findById(userId)
    .then((user) => {
        user.posters.id(posterId).remove()
        return user.save()
    })
    .then(() => {
        res.redirect(`/users/${userId}/posters/`)
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router