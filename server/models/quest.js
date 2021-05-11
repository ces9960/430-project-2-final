const mongoose = require('mongoose');
const _ = require('underscore');

let questModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const questSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    questGiver: {
        type: String,
        required: true,
        trim: true
    },
    objective: {
        type: String,
        required: true,
        trim: true
    },
    reward: {
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

questSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    questGiver: doc.questGiver,
    objective: doc.objective,
    reward: doc.reward
});

questSchema.statics.findByOwner = (ownerId,callback) => {
    const search = {
        owner: convertId(ownerId)
    };

    return questModel.find(search).select('name questGiver objective reward').lean().exec(callback);
}

questModel = mongoose.model('quest',questSchema);

module.exports.questModel = questModel;
module.exports.questSchema = questSchema;