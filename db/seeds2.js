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
    })

    const tony = new User({
        username: 'trif',
        email: 'tony321@testgmail.com',
        firstName: 'Tony',
        lastName: 'Riffel',
        photoUrl: "https://i.imgur.com/Cbf1P4q.png",
    })

    const rhonda = new User({
        username: 'rudy1910',
        email: 'rhonda321@testgmail.com',
        firstName: 'Rhonda',
        lastName: 'Holloway',
        photoUrl: "https://i.imgur.com/k9IPbgp.png",
    })
    
    const nationalBand2 = new Band({
        bandName: 'The National 2',
        hometown: 'Cinncinati, OH',
        profile: 'American Rock band with members Matt Berninger, Aaron Dessner, Bryce Dessner, Scott Devendorf and Bryan Devendorf',
        imageUrl: 'https://i.imgur.com/Ldb4fbJ.jpg',
        website: 'http://americanmary.com/',
        yearFormed: 1999
    })

    diane.save()
    .then(user => {
        console.log(`User ${user.username} created`)
        return tony.save()
    })
    
    .then(user => {
        console.log(`User ${user.username} created`)
        return rhonda.save()
    })

    .then(user => {
        console.log(`User ${user.username} created`)
        return nationalBand.save()
    })

    .then(band => {
        nationalBand.save()
        mongoose.connection.close()
    })

    }).catch((error) => {
        console.log('!!! ERROR SAVING SEEDED DATA !!!')
        console.log(error)
    }).then(() => {
        console.log(`
Finished seeding database...

Disconnected from MongoDB
`)
})