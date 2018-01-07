const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', (req, res) => {
  console.log("Get all")
  User.find({})
    .then((users) => {
      res.render('users/index', {
        users,
        // pageTitle: 'Home'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// CREATE A NEW USER
router.get('/new', (req, res) => {
  res.render('users/new')
})

router.post('/', (req, res) => {
  const newUser = req.body
  if (!newUser.photoUrl) {
    newUser.photoUrl = 'https://i.imgur.com/nbG1deE.png'
  }

  User.create(newUser)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

// SHOW A USER
router.get('/:userId', (req, res) => {
  console.log("Get one")
  const userId = req.params.userId
  User.findById(userId)
    .then((user) => {
      res.render('users/show', {
        user,
        pageTitle: user.username
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// EDIT A USER
router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
    .then((user) => {
      res.render('users/edit', {
        user,
        pageTitle: 'Profile_Update'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

// DELETE A USER
router.get('/:userId/delete', (req, res) => {
  const userId = req.params.userId

  User.findByIdAndRemove(userId)
    .then(() => {
      res.redirect('/users')
    })
    .catch((error) => {
      console.log(error)
    })
})

// SHOW UPDATED USER
router.put('/:userId', (req, res) => {
  const updatedUserInfo = req.body
  const userId = req.params.userId

  User.findByIdAndUpdate(userId, updatedUserInfo, { new: true })
    .then(() => {
      res.redirect(`/users/${userId}`)
    })
})

module.exports = router
