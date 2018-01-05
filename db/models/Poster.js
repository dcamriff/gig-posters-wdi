const mongoose = require('mongoose')
const Schema = require('../Schema')

const Poster = mongoose.model('Poster', Schema.PosterSchema)

module.exports = Poster