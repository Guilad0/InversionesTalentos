var express = require('express');
var router = express.Router();

const { getInvestors, postInvestors,putInvestors,putStateInvestors } = require('../controllers/investors')



router.get('/investors', getInvestors);
router.post('/investors', postInvestors);
router.put('/investors/:id', putInvestors);
router.put('/Stateinvestors/:id', putStateInvestors);


module.exports = router;