const mongoose = require('mongoose')
const Schema = mongoose.Schema

const evalSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bookDate: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Evaluation = mongoose.model('Evaluation', evalSchema);

module.exports = Evaluation