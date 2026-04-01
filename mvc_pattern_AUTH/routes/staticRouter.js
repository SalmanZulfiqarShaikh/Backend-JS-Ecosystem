const express = require('express');
const router = express.Router();
const { restrictToLoggedinUserOnly } = require('../middlewares/auth');
const URL = require('../models/url');

router.get('/', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/home', restrictToLoggedinUserOnly, async (req, res) => {
    const allurls = await URL.find({ createdBy: req.user._id });
    res.render('index', { urls: allurls });
});

module.exports = router;
