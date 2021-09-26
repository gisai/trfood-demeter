const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Farm','Processing','Distribution','Retailer'],
        required: true
    },
    responsible: {
        type: String,
        required: true
    },
    distance: {
        type: Number
    },
    currentLocation: {
        type: {
            type: String,
            default: 'Point',
          },
          coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    },
    pollutionGenerated: {
        type: Number
    },
    pollutionGeneratedTransport: {
        type: Number
    }
}, { timestamps: true })

const usedSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    }
})

const group6Schema = new mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    corporativeID: {
        type: String,
        required: true
    },
    bossID: {
        type: String,
        required: true
    },
    location: {
        type: {
          type: String,
          default: 'Point',
        },
        coordinates: [Number], // [22.2475, 14.2547]  [longitude, latitude]
    },
    distance: {
        type: Number
    },
    expiryDate: {
        type: String,
        required: true
    },
    typefood: {
        type: String,
        enum: ['Rice','Wheat','Sugar','Other'],
        required: true
    },
    pollutionGenerated: {
        type: Number
    },
    pollutionGeneratedTransport: {
        type: Number
    },
    creator: {
        type: String,
        required: true
    },
    permissions: {
       type: [String]
    },
    status: [stateSchema],
    usedProducts: [usedSchema]
}, {timestamps: true});

module.exports = group6Schema;