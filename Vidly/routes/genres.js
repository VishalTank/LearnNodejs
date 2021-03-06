const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
const asyncMiddleware = require('../middlewares/async');
const {Genre, validateGenre} = require('../models/genreModel');


router.get('/', async (req, res) => {
    //throw new Error('could not get genres...');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// router.get('/', async (req, res) => {
//     try {
//         const genres = await Genre.find().sort('name');
//         res.send(genres);
//     }
//     catch (ex) {
//         next(ex);
//     }
// });

router.get('/:id', async (req, res) => {

    const genre = await Genre.findById(req.params.id);
    // const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Genre not found.');

    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const result = validateGenre(req.body);
    if (result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    // const genre = {
    //     id: genres.length + 1,
    //     name: req.body.name,
    // };

    let genre = new Genre({ 
        name: req.body.name 
    });

    genre = await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {

    const result = validateGenre(req.body);
    if (result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    // const genre = genres.find((g) => g.id === parseInt(req.params.id));
    if (!genre)
        return res.status(404).send('Genre not found.');

    // genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {

    const genre = await Genre.findByIdAndRemove(req.params.id);
    // const genre = genres.find((g) => g.id === parseInt(req.params.id));

    if (!genre)
        return res.status(404).send('Genre not found.');

    // const i = genres.indexOf(genre);
    // genres.splice(i, 1);
    res.send(genre);
});

module.exports = router;