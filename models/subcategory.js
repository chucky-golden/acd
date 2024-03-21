const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subCategorySchema = new Schema({
    categoryid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
}, { timestamps: true })


const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory