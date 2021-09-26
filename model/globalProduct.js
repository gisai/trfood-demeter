const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    nutritionalInformation: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    },
    groupFood: {
        type: String,
        required: true
    },
    pollutionGenerated: {
        type: Number
    },
    permissions: {
        type: [String]
    },
    products: [String],
    img:
    {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true })


module.exports = productSchema;