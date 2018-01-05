const mongoose = require('mongoose')
const Schema = require('../schema')

const Poster = mongoose.model('Poster', Schema.PosterSchema)

module.exports = Poster