const mongoose = require('mongoose');
const _ = require('underscore');

let placeModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    population: {
        type: Number,
        min:0,
        required: true,
    },
    placeType: {
        type: String,
        required: true,
        trim: true
    },
    climate: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Account'
    },
    createdDate: {
        type:Date,
        default: Date.now
    }
});

placeSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    population: doc.population,
    placeType: doc.placeType,
    climate: doc.climate
});

placeSchema.statics.findByOwner = (ownerId,callback) => {
    const search = {
        owner: convertId(ownerId)
    };

    return placeModel.find(search).select('name population placeType climate').lean().exec(callback);
}

placeModel = mongoose.model('place',placeSchema);

module.exports.placeModel = placeModel;
module.exports.placeSchema = placeSchema;