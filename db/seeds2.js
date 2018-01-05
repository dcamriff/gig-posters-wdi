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

    const tony = new User({
        username: 'trif',
        email: 'tony321@testgmail.com',
        firstName: 'Tony',
        lastName: 'Riffel',
        photoUrl: "https://i.imgur.com/Cbf1P4q.png",
        posters: []
    })

    const rhonda = new User({
        username: 'rudy1910',
        email: 'rhonda321@testgmail.com',
        firstName: 'Rhonda',
        lastName: 'Holloway',
        photoUrl: "https://i.imgur.com/k9IPbgp.png",
        posters: []
    })

    const riloBand = new Band({
        bandName: 'Rilo Kiley',
        hometown: 'Los Angeles',
        profile: 'Indie Rock band with members Jenny Lewis, Blake Sennett, Pierre de Reeder, and Dave Rock',
        imageUrl: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-1/c71.0.480.480/p480x480/488009_421767014564976_284023470_n.jpg?oh=34a3f8bd166e83123bb03d1c3375dd37&oe=5AED0607',
        website: 'https://www.rilokiley.com/',
        yearFormed: 1998
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
        return riloBand.save()
    })

    .then(band => {
        riloBand.save()
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