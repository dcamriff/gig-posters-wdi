const express = require('express')
const router = express.Router()
const User = require('../db/models/User')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.find({})
  .then((users) => {
    res.render('users/index.hbs', {
      users
    })
  })
  .catch((error) => {
    console.log(error)
  })
})

router.get('/new', (req, res) => {
  res.render('users/new')
})

router.post('/', (req, res) => {
  const newUser = req.body
  if(!newUser.photoUrl) {
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

router.get('/:userId', (req, res) => {
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

router.get('/:userId/edit', (req, res) => {
  const userId = req.params.userId
  
})

module.exports = router
