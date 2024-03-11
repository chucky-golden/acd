const mongoose = require('mongoose')
const Schema = mongoose.Schema

const logoSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Logo = mongoose.model('Logo', logoSchema);

module.exports = Logo