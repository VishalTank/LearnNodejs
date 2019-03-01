const {Movie, validateMovie} = require('../models/movieModel');
const {Genre} = require('../models/genreModel');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const result = await Movie.find().sort('title');
    res.send(result);   
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if(!movie)
        return res.status(404).send('Movie not found.');

        res.send(movie);
});

router.post('/', async (req, res) => {
    const result = validateMovie(req.body);
    if(result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre)
        return res.status(400).send('Invalid genre...');

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
    });

    movie = await movie.save();
    res.send(movie);
});

router.put('/:id', async (req, res) => {
    
    const result = validateMovie(req.body);
    if(result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre)
        return res.status(400).send('Invalid genre...');

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
        }, { new: true });

    // movie = await movie.save();
    res.send(movie);
});

router.delete('/:id', async (req, res) => {

    const result = await Movie.findByIdAndRemove(req.params.id);

    if(!result)
        return res.status(404).send('Movie not found.');

    res.send(result);
});

module.exports = router;