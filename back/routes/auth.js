var express = require('express');
var router = express.Router();

const { auth, forgotPassword, resetPassword, resetPasswordForm, updatePassword } = require('../controllers/auth');

router.post('/',auth);

router.get('/login', function(req, res, next) {
    res.render('login');
  });

  router.post('/forgot-password', forgotPassword); 
  router.post('/reset-password/:token', resetPassword); 
  router.get('/forgot-password/:token', resetPasswordForm);
  router.post('/update-password', updatePassword);

module.exports = router;