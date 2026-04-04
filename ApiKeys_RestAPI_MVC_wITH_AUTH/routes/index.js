const express = require('express');
const router = express.Router();
const { restrictToLoggedinUserOnly } = require('../middlewares/isLoggedIn');
const Api = require('../models/api');

router.get('/', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/home', restrictToLoggedinUserOnly, async (req, res) => {
    const allapis = await Api.find({ createdBy: req.user._id });
    res.render('index', { apis: allapis });
});

module.exports = router;
