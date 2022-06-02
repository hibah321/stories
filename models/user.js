const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
    },
    googleId: {
        typre: String,
    },
    image: {
        type: String,
    },
},{timestamps: true})


const User = mongoose.model('user', userSchema)

module.exports = User

