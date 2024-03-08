const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    email: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Newsletter = mongoose.model('Newsletter', newsSchema);

module.exports = Newsletter