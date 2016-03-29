var express = require('express');
var auth = require('./../services/authentication');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Login attempt: ', Date.now());
    next();
});

// GET /api/
router.get('/', function(req, res) {
    auth.getCurrentUser(function(user) {
        res.send('Current user: ' + user.name);
    });
});

// POST /api/
router.post('/', function(req, res) {
    res.send('logged in');
});

module.exports = router;
