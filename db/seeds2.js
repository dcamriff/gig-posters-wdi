require('dotenv').config()
const User = require('./models/User')
const Poster = require('./models/Poster')
const Band = require('./models/Band')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.once('open', () => {
    console.log('Mongoose has connected to MongoDB!')
})

mongoose.connection.on('error', (error) => {
    console.error(`MongoDB connection error!${error}`)
    process.exit(-1)
})

User.remove({}).then(() => {
    const diane = new User({
        username: 'lil_diane2',
        email: 'diane@saturationproject.com',
        firstName: 'Diane',
        lastName: 'Cam-Riffel'
    })
    console.log('User Diane created')
    diane.save()
})