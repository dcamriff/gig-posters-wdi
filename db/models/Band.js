const mongoose = require('mongoose')
const Schema = require('../Schema')

const Band = mongoose.model('Band', Schema.BandSchema)

module.exports = Band