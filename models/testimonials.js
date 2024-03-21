const mongoose = require('mongoose')
const Schema = mongoose.Schema

const testimonialSchema = new Schema({
    img: {
        type: String,
        required: true
    },
    cloudinaryid: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: false
    },
    message: {
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


const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial