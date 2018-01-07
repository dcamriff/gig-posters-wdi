const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const PosterSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'The poster title is required!']
        },
        story: {
            type: String,
            default: "Tell a fun memory about how/when this poster was acquired."
        },
        artist: String,
        mediumType: String,
        limitedEdition: String,
        imageUrl: {
            type: String,
            default: 'https://i.imgur.com/xUNTDKM.jpg'
        },
        showYear: String,
        showLocation: String,
        band: String
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required!'],
            unique: [true, 'That username is already in use']
        },
        email: {
            type: String,
        },
        firstName: {
            type: String,
            required: [true, 'First name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        photoUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/1000x1000/66/98/monkey-with-headphones-vector-6216698.jpg'
        },
        posters: [PosterSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

const BandSchema = new Schema(
    {
        bandName: {
            type: String,
            required: [true, 'The band name is required!'],
            unique: true
        },
        hometown: String,
        profile: String,
        imageUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/1000x1000/66/98/monkey-with-headphones-vector-6216698.jpg'
        },
        website: String,
        yearFormed: Number
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    PosterSchema,
    UserSchema,
    BandSchema
}