const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    company: {
        type: String
    },
    professions: {
        type: String,
        enum: ['farmer','agriHub','foodMarket','restaurant','retailer'],
        required: true
    },
    img: {
        data: Buffer,
        contentType:String
    },
    date: {
      type: Date,
      default: Date.now
    }
});

module.exports = userSchema;