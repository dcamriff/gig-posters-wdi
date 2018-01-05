const mongoose = require('mongoose')
const Schema = require('../schema')

const Band = mongoose.model('Band', Schema.BandSchema)

module.exports = Band