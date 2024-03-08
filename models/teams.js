const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    },
    comment: {
        type: String,
        required: false
    },
    facebook: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    twitter: {
        type: String,
        required: false
    },
}, { timestamps: true })


const Team = mongoose.model('Team', teamSchema);

module.exports = Team