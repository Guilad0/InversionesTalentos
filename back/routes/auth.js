var express = require('express');
var router = express.Router();

const { auth } = require('../controllers/auth');

router.post('/',auth);

router.get('/login', function(req, res, next) {
    res.render('login');
  });

module.exports = router;