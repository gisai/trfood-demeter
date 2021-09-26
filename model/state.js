const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Harvest','Processing','Transportation','Distribution'],
        required: true
    },
    responsible: {
        type: String,
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    pollutionGenerated: {
        type: Number,
        required: true
    },
    date: {
      type: Date,
      default: Date.now,
      required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('State', stateSchema);