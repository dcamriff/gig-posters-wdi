require('dotenv').config()
const User = require('./models/User')
const Poster = require('./models/Poster')
const Band = require('./models/Band')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useMongClient: true
})

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
        username: 'lil_diane2',
        email: 'diane@saturationproject.com',
        firstName: 'Diane',
        lastName: 'Cam-Riffel',
        photoUrl: 'https://i.imgur.com/nbG1deE.png'
    })

Poster.remove({}).then(() => {
    const riloPoster = new Poster({
        title: 'Riley Kiley 2005 Tour',
        story: 'Favorite Poster',
        yearOfShow: 2005,
        monthOfShow: 05,
        dayOfShow: 01,
            locationCity: 'Philadelphia',
            imgUrl: 'https://i.imgur.com/xUNTDKM.jpg',
            artist: 'Eleanor Grosch / Push Me Pull You Design',
            mediumType: 'Hand Screenprinted on paper',
            limtedEdition: true,
            bands: 'Rilo Kiley'
        })
        riloPoster.save()

        diane.posters.push(riloPoster)

        return diane.save()
    })
        .then(() => {
            return Band.create({
                const riloBand = new Band({
                    bandName: 'Rilo Kiley',
                    hometown: 'Los Angeles',
                    profile: 'Indie Rock band with members Jenny Lewis, Blake Sennett, Pierre de Reeder, and Dave Rock',
                    imageUrl: 'https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-1/c71.0.480.480/p480x480/488009_421767014564976_284023470_n.jpg?oh=34a3f8bd166e83123bb03d1c3375dd37&oe=5AED0607',
                    website: 'https://www.rilokiley.com/',
                    yearFormed: 1998
                }),

                riloBand.save()
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