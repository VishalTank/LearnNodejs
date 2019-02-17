const express = require('express');
const router = express.Router();

//GET
router.get('/', (req, res) => {
    //res.send('Hello World!');
    res.render('index', {
        title: "myTitle",
        message: "myMessage",
    });
});

module.exports = router;