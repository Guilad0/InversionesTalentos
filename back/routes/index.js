var express = require('express');
var router = express.Router();
const {connection} = require('../database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const transporter = require('../helpers/mailer');



const forgotPassword = (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ error: 'El correo es requerido' });
  }

  const query = `SELECT * FROM usuarios WHERE correo = ?`;
  connection.query(query, [correo], (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      return res.status(500).send('Error al procesar la solicitud');
    }

    if (results.length === 0) {
      return res.status(400).json({ error: 'El correo no está registrado' });
    }

    const usuario = results[0];
    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 hora

    const updateQuery = `UPDATE usuarios SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE usuario_id = ?`;
    connection.query(updateQuery, [token, tokenExpiry, usuario.usuario_id], (updateErr) => {
      if (updateErr) {
        console.error('Error al guardar el token de restablecimiento:', updateErr);
        return res.status(500).send('Error al guardar el token de restablecimiento');
      }

      const resetLink = `https://talentos.pruebasdeploy.online/reset-password/${token}`;
      const mailOptions = {
        from: process.env.GG_EMAIL,
        to: correo,
        subject: 'Restablece tu contraseña',
        text: `Olvidaste tu contraseña?
        Por favor, restablece tu contraseña haciendo clic en el siguiente enlace: ${resetLink}`,
        html: `
          <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenido</title>
        <style>
            .mail-container {
                background-color: #ff;
                padding: 20px;
                border-radius: 10px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .mail-header {
                background-color: #17223B;;
                padding: 10px;
                border-radius: 10px 10px 0 0;
                text-align: center;
                color: white;
            }
            .mail-content {
                padding: 20px;
            }
            .verification-link {
                background-color: #F37926;
                color: white;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
            .mail-footer {
                text-align: center;
                font-size: 12px;
                color: #777;
                margin-top: 20px;
            }
        </style>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div class="mail-container">
            <div class="mail-header">
                <h1 style="margin: 0;">¿Olvidaste tu contraseña?</h1>
            </div>
            <div class="mail-content">
                <p>Estimado usuario,</p>
                <p>Te enviamos este correo para que puedas restablecer tu contraseña.</p>
                <p>Para continuar y elegir una nueva haz click en el siguiente enlace:</p>
                
                <a class="verification-link" href="${resetLink}">Ir a reestablecer contraseña</a>
            </div>
            <div class="mail-footer">
                <p>&copy; 2024 Talento Inversiones. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
        `
      };

      transporter.sendMail(mailOptions, (error) => {
        if (error) {
          return res.status(500).send('Error al enviar el correo de restablecimiento');
        }
        res.cookie('resetToken', token, { maxAge: 3600000, httpOnly: true });
        res.send('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
      });
    });
  });
};



const resetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Asegúrate de que el token y la contraseña estén presentes
  if (!token || !password) {
      return res.status(400).json({ error: 'Token o contraseña faltante' });
  }

  const query = `SELECT * FROM usuarios WHERE resetPasswordToken = ? AND resetPasswordExpires > ?`;
  connection.query(query, [token, Date.now()], (err, results) => {
      if (err) {
          console.error('Error en la consulta:', err);
          return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
      }
      if (results.length === 0) {
          return res.status(400).json({ error: 'El token es inválido o ha expirado' });
      }

      const usuario = results[0];
      bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
          if (hashErr) {
              console.error('Error al hashear la contraseña:', hashErr);
              return res.status(500).json({ error: 'Error al hashear la nueva contraseña' });
          }
          const updateQuery = `UPDATE usuarios SET password = ?, resetPasswordToken = NULL, resetPasswordExpires = NULL WHERE usuario_id = ?`;
          connection.query(updateQuery, [hashedPassword, usuario.usuario_id], (updateErr) => {
              if (updateErr) {
                  console.error('Error al actualizar la contraseña:', updateErr);
                  return res.status(500).json({ error: 'Error al guardar la nueva contraseña' });
              }
              res.json({ message: 'Contraseña restablecida exitosamente' });
          });
      });
  });
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Ruta para solicitar el restablecimiento de contraseña
router.post('/forgot-password', forgotPassword);

// Ruta para restablecer la contraseña
router.post('/reset-password/:token', resetPassword);

module.exports = router;