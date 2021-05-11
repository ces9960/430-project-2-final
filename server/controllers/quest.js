const quest = require('../models/quest.js');

const makeQuest = (req,res) => {
    if(!req.body.name || !req.body.questGiver ||  !req.body.objective || !req.body.reward){
        return res.status(400).json({error: 'All fields are required'});
    }

    const questData = {
        name: req.body.name,
        questType: req.body.questType,
        description: req.body.description,
        location: req.body.location,
        owner: req.session.account._id
    };

    const newQuest = new quest.questModel(questData);

    const questPromise = newQuest.save();

    questPromise.then(() => res.json({redirect: '/questMaker'}));

    questPromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'quest already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return questPromise;
}

module.exports.make = makeQuest;