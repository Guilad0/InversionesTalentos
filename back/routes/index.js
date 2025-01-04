import express from 'express';
import { forgotPassword, resetPassword } from '../routes/auth.js';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ruta para solicitar el restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', resetPassword);

export default router;