import { EHOSTUNREACH } from 'constants';

const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [ true, 'Username is required!' ]
        },
        email: {
            type: String,
        },
        firstName: {
            type: String,
            required: [ true, 'First name is required.' ]
        },
        lastName: {
            type: String,
            required: [ true, 'Last name is required.' ]
        },
        photoUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/1000x1000/66/98/monkey-with-headphones-vector-6216698.jpg'
        },
        posters: [ PosterSchema ]
    },
    {
    timestamps: {},
    usePushEach: true
    }
)