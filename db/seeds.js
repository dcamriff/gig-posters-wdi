require('dotenv').config()
const User = require('./models/User')
const Poster = require('./models/Poster')
const Band = require('./models/Band')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MOGODB_URI, {
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
    const dianeRiffel = new User({
        username: 'lil_diane',
        email: 'diane@saturationproject.com',
        firstName: 'Diane',
        lastName: 'Cam-Riffel',
        photoUrl: 'https://i.imgur.com/nbG1deE.png'
    })

    const riloKiley1 = new Poster({
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
})
