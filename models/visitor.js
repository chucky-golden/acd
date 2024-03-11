const mongoose = require('mongoose')
const Schema = mongoose.Schema

const visitSchema = new Schema({
    date: {
        type: String,
        required: true
    },
    count: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit