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
        username: 'dcam',
        email: 'diane321@testgmail.com',
        firstName: 'Diane',
        lastName: 'Riffel',
        photoUrl: "https://i.imgur.com/nbG1deE.png",
        posters: []
    })
    console.log('User Diane created')

    const tony = new User({
        username: 'trif',
        email: 'tony321@testgmail.com',
        firstName: 'Tony',
        lastName: 'Riffel',
        photoUrl: "https://i.imgur.com/Cbf1P4q.png",
        posters: []
    })
    console.log('User Tony created')

    const rhonda = new User({
        username: 'rudy1910',
        email: 'rhonda321@testgmail.com',
        firstName: 'Rhonda',
        lastName: 'Holloway',
        photoUrl: "https://i.imgur.com/k9IPbgp.png",
        posters: []
    })
    console.log('User Rhonda created')

    diane.save()
    tony.save()
    rhonda.save()

    }).catch((error) => {
        console.log('!!! ERROR SAVING SEEDED DATA !!!')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`
Finished seeding database...

Disconnected from MongoDB
`)
})