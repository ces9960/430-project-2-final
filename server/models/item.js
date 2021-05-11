const mongoose = require('mongoose');
const _ = require('underscore');

let itemModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    itemType: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    location: {
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

itemSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    price: doc.price,
    itemType: doc.itemType,
    description: doc.description,
    location: doc.location
});

itemSchema.statics.findByOwner = (ownerId,callback) => {
    const search = {
        owner: convertId(ownerId)
    };

    return itemModel.find(search).select('name price itemType description location').lean().exec(callback);
}

itemModel = mongoose.model('item',itemSchema);

module.exports.itemModel = itemModel;
module.exports.itemSchema = itemSchema;