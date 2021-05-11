const mongoose = require('mongoose');
const _ = require('underscore');

let npcModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const npcSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    age: {
        type: Number,
        min: 0,
        required: true,
    },
    alignment: {
        type: String,
        required: true,
        trim: true
    },
    appearance: {
        type: String,
        required: true,
        trim: true
    },
    personality: {
        type: String,
        required: true,
        trim: true
    },
    backstory: {
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

npcSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    age: doc.age,
    alignment: doc.alignment,
    appearance: doc.appearance,
    personality: doc.personality,
    backstory: doc.backstory,
    location: doc.location
});

npcSchema.statics.findByOwner = (ownerId,callback) => {
    const search = {
        owner: convertId(ownerId)
    };

    return npcModel.find(search).select('name age alignment appearance personality backstory location').lean().exec(callback);
}

npcModel = mongoose.model('npc',npcSchema);

module.exports.npcModel = npcModel;
module.exports.npcSchema = npcSchema;