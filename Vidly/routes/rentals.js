const {Rental, validateRental} = require('../models/rentalModel');
const {Movie} = require('../models/movieModel');
const {Customer} = require('../models/customerModel');
const mongoose = require('mongoose');
const Fawm = require('fawn');
const express = require('express');
const router = express.Router();

Fawm.init(mongoose);

router.get('/', async (req, res) => {
    const result = await Rental.find().sort('-dateOut');
    res.send(result);
});

router.post('/', async (req, res) => {
    const result = validateRental(req.body);
    if(result.error)
        res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer)
        res.status(400).send('Invalid Customer...');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie)
        res.status(400).send('Invalid Movie...');
        
    if(movie.numberInStock === 0)
        return res.status(400).send('Movie not in stock...');

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold,
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
            },
        });

        rental = await rental.save();
        
        movie.numberInStock--;
        movie.save();

        res.send(rental);
        
        // try {
        //     new Fawn.Task()
        //         .save('rentals', rental)
        //         .update('movies', { _id: movie._id }, { 
        //             $inc: { numberInStock: -1 }
        //         })
        //         .run();

        //     res.send(rental);
        // }
        // catch(ex) {
        //     res.status(500).send(ex);
        // }
});

module.exports = router;