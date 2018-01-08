const express = require('express')
const router = express.Router({ mergeParams: true })
const User = require('../db/models/User')
const Poster = require('../db/models/Poster')

// GET POSTERS LISTING
router.get('/', (req, res) => {
    const userId = req.params.userId

    User.findById(userId)
        .then((user) => {
            res.render('posters/index', {
                userFullName: `${user.firstName} ${user.lastName}`,
                userId: user._id,
                posters: user.posters,
                pageTitle: 'Posters'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

// NEW POSTER ROUTE
router.get('/new', (req, res) => {
    const userId = req.params.userId

    User.findById(userId)
        .then((user) => {
            res.render('posters/new', {
                userFullName: `${user.firstName} ${user.lastName}`,
                userId: user._id,
                posters: user.posters,
                pageTitle: 'New Poster'
            })
        })

    // EDIT A PARTICULAR POSTER
    router.get('/:posterId/edit', (req, res) => {
        const userId = req.params.userId
        const posterId = req.params.posterId

        User.findById(userId)
            .then((user) => {
                const poster = user.poster.id(posterId)
                res.render('posters/edit', {
                    userId,
                    poster,
                    pageTitle: 'Poster'
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })

    // SHOW A PARTICULAR POSTER
    router.get('/:posterId', (req, res) => {
        const userId = req.params.userId
        const posterId = req.params.posterId

        User.findById(userId)
            .then((user) => {
                const poster = user.posters.id(posterId)
                res.render('posters/show', {
                    userId,
                    poster,
                    pageTitle: 'Poster'
                })
            })
            .catch((error) => {
                console.log(error)
            })
    })

    // CREATE A NEW POSTER
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

    // DELETE A POSTER
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

    // NOW UPDATE THE EXISTING USER PROFILE
    router.put('/:posterId', (req, res) => {
        const userId = req.params.userId
        const updatedPosterInfo = req.body
        const posterId = req.params.posterId
        console.log(updatedPosterInfo)

        User.findById(userId)
            .then((user) => {
                const originalPosterInfo = user.posters.id(posterId)
                originalPosterInfo.title = updatedPosterInfo.title
                originalPosterInfo.story = updatedPosterInfo.story
                originalPosterInfo.artist = updatedPosterInfo.artist
                originalPosterInfo.mediumType = originalPosterInfo.mediumType
                originalPosterInfo.limitedEdition = originalPosterInfo.limitedEdition
                originalPosterInfo.imageUrl = originalPosterInfo.imageUrl
                originalPosterInfo.showYear = originalPosterInfo.showYear
                originalPosterInfo.band = originalPosterInfo.band
                return user.save()
            })
            .then(() => {
                res.redirect(`/users/${userId}`)
            })
    })
})

module.exports = router