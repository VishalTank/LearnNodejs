const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');

const _ = require('lodash');
const {User, validateUser} = require('../models/userModel');

const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const result = await User.find().sort('name');
    res.send(result);
});

router.post('/', async (req, res) => {
    const result = validateUser(req.body);
    if (result.error) 
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(user)
        return res.status(400).send('User already registered...');

    user = new User(
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password,
        _.pick(req.body, ['name', 'email', 'password'])
    );

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();

    res
    .header('x-auth-token', token)
    .send(_.pick(user, ['id', 'name', 'email']));
});

module.exports = router;