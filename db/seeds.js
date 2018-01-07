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

// delete users then add fake test ones
User.remove({}).then(() => {
    const diane = new User({
        username: 'dcamriff',
        email: 'diane321@testgmail.com',
        firstName: 'Diane',
        lastName: 'Riffel',
        photoUrl: 'https://i.imgur.com/nbG1deE.png'
    })

    const riloPoster = new Poster({
        title: 'Riley Kiley 2005 Tour',
        story: 'Favorite Poster',
        artist: 'Eleanor Grosch',
        mediumType: 'Hand screenprinted on paper',
        limitedEdition: 'yes',
        imgUrl: 'https://i.imgur.com/BE17saU.jpg',
        showYear: '2005',
        showLocation: 'Philadelphia',
        band: 'Rilo Kiley'
    })

    diane.posters.push(riloPoster)

    return diane.save()
}).then(() => {
    return User.create({
        username: 'trif',
        email: 'tony321@testgmail.com',
        firstName: 'Tony',
        lastName: 'Riffel',
        photoUrl: "https://i.imgur.com/Cbf1P4q.png"
    })
}).then((trif) => {
    const nationalPoster = new Poster({
        title: 'The National 2014 Tour',
        story: 'Octane Poster Show',
        artist: 'Brady Clark',
        mediumType: 'Hand screenprinted on paper',
        limitedEdition: 'yes',
        imgUrl: 'https://i.imgur.com/2tiU74x.jpg',
        showYear: '2014',
        showLocation: 'Austin, TX',
        band: 'The National'
    })

    trif.posters.push(nationalPoster)

    return trif.save()

})
Band.remove({}).then(() => {
    const riloBand = new Band({
        bandName: 'Rilo Kiley',
        hometown: 'Los Angeles',
        profile: 'Indie Rock band with members Jenny Lewis, Blake Sennett, Pierre de Reeder, and Dave Rock',
        imageUrl: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-1/c71.0.480.480/p480x480/488009_421767014564976_284023470_n.jpg?oh=34a3f8bd166e83123bb03d1c3375dd37&oe=5AED0607',
        website: 'https://www.rilokiley.com/',
        yearFormed: 1998
    })

    return riloBand.save()
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