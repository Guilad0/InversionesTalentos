var express = require('express');
var router = express.Router();


const { getContact, postContact, putStateContact, sendEmail } = require('../controllers/contact')

router.get('/', getContact);
router.post('/', postContact);
router.put('/stateContact/:id', putStateContact);
router.post('/comments/:id', sendEmail);


module.exports = router;