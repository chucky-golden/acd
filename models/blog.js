const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    header: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true })


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog