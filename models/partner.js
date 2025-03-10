const mongoose = require('mongoose')
const Schema = mongoose.Schema

const partnerSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner