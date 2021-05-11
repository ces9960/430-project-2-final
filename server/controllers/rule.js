const rule = require('../models/rule.js');

const makeRule = (req,res) => {
    if(!req.body.name || !req.body.oldText || !req.body.newText){
        return res.status(400).json({error: 'All fields are required'});
    }

    const ruleData = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        owner: req.session.account._id
    };

    const newRule = new rule.ruleModel(ruleData);

    const rulePromise = newRule.save();

    rulePromise.then(() => res.json({redirect: '/ruleMaker'}));

    rulePromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'rule already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return rulePromise;
}

module.exports.make = makeRule;