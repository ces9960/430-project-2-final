const npc = require('../models/npc.js');

const makeNpc = (req,res) => {
    if(!req.body.name || !req.body.age || !req.body.alignment ||  !req.body.appearance || !req.body.personality || !req.body.backstory || !req.body.location){
        return res.status(400).json({error: 'All fields are required'});
    }

    const npcData = {
        name: req.body.name,
        age: req.body.age,
        alignment: req.body.alignment,
        appearance: req.body.appearance,
        personality: req.body.personality,
        backstory: req.body.backstory,
        location: req.body.location,
        owner: req.session.account._id
    };

    const newNpc = new npc.npcModel(npcData);

    const npcPromise = newNpc.save();

    npcPromise.then(() => res.json({redirect: '/npcMaker'}));

    npcPromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'npc already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return npcPromise;
}

module.exports.make = makeNpc;