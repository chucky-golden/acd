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
    building: {
        type: String,
        required: true
    },
    entrance: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    paths: {
        type: String,
        required: true
    },
    gtoilet: {
        type: String,
        required: true
    },
    atoilet: {
        type: String,
        required: true
    },
    lifts: {
        type: String,
        required: true
    },
}, { timestamps: true })


const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats