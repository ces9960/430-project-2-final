const mongoose = require('mongoose');
const _ = require('underscore');

let ruleModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: setName
    },
    oldText: {
        type: String,
        required: true,
        trim: true
    },
    newText: {
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

ruleSchema.statics.toAPI = (doc) => ({
    name: doc.name,
    oldText: doc.oldText,
    newText: doc.newText
});

ruleSchema.statics.findByOwner = (ownerId,callback) => {
    const search = {
        owner: convertId(ownerId)
    };

    return ruleModel.find(search).select('name oldText newText').lean().exec(callback);
}

ruleModel = mongoose.model('rule',ruleSchema);

module.exports.ruleModel = ruleModel;
module.exports.ruleSchema = ruleSchema;