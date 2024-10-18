var express = require('express');
var router = express.Router();

const { auth } = require('../controllers/auth');

router.post('/',auth);

module.exports = router;