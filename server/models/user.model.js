const mongoose = require('mongoose')

const User = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    passwd: { type: String, required: true },
    // img: { type: Buffer, contentType: String , required: true }
},{collection: 'user-data' })

const model = mongoose.model('UserData', User)

module.exports = model