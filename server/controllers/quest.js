const quest = require('../models/quest.js');

const makeQuest = (req,res) => {
    if(!req.body.name || !req.body.questGiver ||  !req.body.objective || !req.body.reward){
        return res.status(400).json({error: 'All fields are required'});
    }

    const questData = {
        name: req.body.name,
        questGiver: req.body.questGiver,
        objective: req.body.objective,
        reward: req.body.reward,
        owner: req.session.account._id
    };

    const newQuest = new quest.questModel(questData);

    const questPromise = newQuest.save();

    questPromise.then(() => res.json({redirect: '/questMaker'}));

    questPromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'Quest already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return questPromise;
}

const questPage = (req,res) => {
    quest.questModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'})
        }
        return res.render('app',{quests:docs});
    });
};

const getQuests = (request,response) => {
    const req = request;
    const res = response;

    return quest.questModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'});
        }
        return res.json({quests:docs});
    });
};

module.exports.questPage = questPage;
module.exports.getQuests = getQuests;
module.exports.makeQuest = makeQuest;