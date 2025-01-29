const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    compScore: {
        type: String,
        required: true
    },
    quota: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    spost: {
        type: String,
        required: true
    },
    camera: {
        type: String,
        required: true
    },
    point: {
        type: String,
        required: true
    },
    emergency: {
        type: String,
        required: true
    },
    srating: {
        type: String,
        required: true
    },
    external: {
        type: String,
        required: true
    },
    goods: {
        type: String,
        required: true
    },
    fixtures: {
        type: String,
        required: true
    },
    amenities: {
        type: String,
        required: true
    },
    numberOfEmployees: {
        type: String,
        required: false
    },
    employessWithDisability: {
        type: String,
        required: false
    },
    policy: {
        type: String,
        required: false
    },
}, { timestamps: true })


const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats