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
          coordinates: [Number],  // [22.2475, 14.2547]  [longitude, latitude]
    },
    pollutionGeneratedTransport: {
        type: Number
    },
    pollutionGenerated: {
        type: Number
    }
}, { timestamps: true })

const group1Schema = new mongoose.Schema({
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
        enum: ['Cheese','Other'],
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
    img:
    {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});


module.exports = group1Schema;