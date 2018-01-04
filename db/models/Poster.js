const mongoose = require('mongoose')
const Schema = require('../Schema')

const Poster = mongoose.model('Poster', Schema.UserSchema)

module.exports = Poster