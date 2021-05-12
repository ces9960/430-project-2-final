const place = require('../models/place.js');

const makePlace = (req,res) => {
    if(!req.body.name || !req.body.population || !req.body.placeType || !req.body.climate || !req.body.description){
        return res.status(400).json({error: 'All fields are required'});
    }

    const placeData = {
        name: req.body.name,
        population: req.body.population,
        placeType: req.body.placeType,
        climate: req.body.climate,
        description: req.body.description,
        owner: req.session.account._id
    };

    const newPlace = new place.placeModel(placeData);

    const placePromise = newPlace.save();

    placePromise.then(() => res.json({redirect: '/placeMaker'}));

    placePromise.catch((err) => {
        console.log(err);
        if(error.code === 11000){
            return res.status(400).json({error: 'place already exists'});
        }

        return res.status(400).json({error: 'An error occurred'});
    });

    return placePromise;
}

const placePage = (req,res) => {
    place.placeModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'})
        }
        return res.render('app',{places:docs});
    });
};

const getPlaces = (request,response) => {
    const req = request;
    const res = response;

    return place.placeModel.findByOwner(req.session.account._id, (err,docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occurred'});
        }

        return res.json({places: docs});
    });
};

module.exports.placePage = placePage;
module.exports.getPlaces = getPlaces;
module.exports.makePlace = makePlace;