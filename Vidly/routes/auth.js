const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const _ = require('lodash');
const { User } = require('../models/userModel');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    //validate that body contains all fields needed.
    const result = validate(req.body);
    if (result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    //validate email 
    let user = await User.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).send('Incorrect email or password...');
  
    //check if given password is same as user's password given while registering
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
        return res.status(400).send('Incorrect email or password...');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
    const schema = {
        email: Joi.string().min(10).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(req, schema);
}

module.exports = router;