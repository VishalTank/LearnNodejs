const express = require('express');
const router = express.Router();

const {Customer, validateCustomer} = require('../models/customerModel');


router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/:id', async (req, res) => {

    const customer = await Customer.findById(req.params.id);
    // const genre = genres.find((g) => g.id === parseInt(req.params.id));

    if (!customer)
        return res.status(404).send('Customer not found.');

    res.send(customer);
});

router.post('/', async (req, res) => {
    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    // const genre = {
    //     id: genres.length + 1,
    //     name: req.body.name,
    // };

    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/:id', async (req, res) => {

    const result = validateCustomer(req.body);
    if (result.error)
        return res.status(400).send(result.error.name + ": " + result.error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone,
        }, { new: true });

    // const genre = genres.find((g) => g.id === parseInt(req.params.id));

    if (!customer)
        return res.status(404).send('Customer not found.');

    // genre.name = req.body.name;
    res.send(customer);
});

router.delete('/:id', async (req, res) => {

    const customer = await Customer.findByIdAndRemove(req.params.id);
    // const genre = genres.find((g) => g.id === parseInt(req.params.id));

    if (!customer)
        return res.status(404).send('Customer not found.');

    // const i = genres.indexOf(genre);
    // genres.splice(i, 1);

    res.send(customer);
});

module.exports = router;