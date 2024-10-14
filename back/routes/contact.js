var express = require('express');
var router = express.Router();

// Importamos los controladores que manejarán las solicitudes relacionadas con los contactos.
const { getContact, postContact, putStateContact, sendEmail } = require('../controllers/contact')

// Declaración de las rutas para las operaciones de contacto.
router.get('/', getContact);
router.post('/', postContact);
router.put('/stateContact/:id', putStateContact);
router.post('/comments/:id', sendEmail);


module.exports = router;