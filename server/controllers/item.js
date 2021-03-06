const item = require('../models/item.js');

const makeItem = (req,res) => {
    if(!req.body.name || !req.body.price || !req.body.itemType ||  !req.body.description || !req.body.location){
        return res.status(400).json({error: 'All fields are required'});
    }

    const itemData = {
        name: req.body.name,
        price: req.body.price,
        itemType: req.body.itemType,
        description: req.body.description,
        location: req.body.location,
        owner: req.session.account._id
    };

    const newItem = new item.itemModel(itemData);

    const itemPromise = newItem.save();

    itemPromise.then(() => res.json({redirect: '/itemMaker'}));

    itemPromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'Item already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return itemPromise;
}

const itemPage = (req,res) => {
    item.itemModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'})
        }
        return res.render('app',{items:docs});
    });
};

const getItems = (request,response) => {
    const req = request;
    const res = response;

    return item.itemModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'});
        }
        return res.json({items:docs});
    });
};

module.exports.itemPage = itemPage;
module.exports.getItems = getItems;
module.exports.makeItem = makeItem;