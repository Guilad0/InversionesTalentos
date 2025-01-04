import express from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import transporter from '../helpers/mailer.js';
import { User } from '../models/mainExport.js';
import {getError500, getDataError400, getResponse200WithData, getResponse200 } from '../helpers/Response.js';
import { generateToken, handleCredentials, verifyGoogleToken } from '../helpers/token.js';
import { Op } from 'sequelize';



var routerAuth = express.Router();


const auth = async (req, res) => {
  const { correo, password, storeCredentials } = req.body;
  if (!correo || !password) { return getDataError400('Correo y contraseña son obligatorios', res)}
  try { 
      const user = await User.findOne({ where: { correo: correo}, });
      if(!user) {return getDataError400('Revisa tus credenciales', res)};
      const validPassword = await bcrypt.compare(password, user.password);
      if(!validPassword) {return getDataError400('Contrasenia incorrecta', res)};
      if(user.verificado != 1) {return getDataError400('Verifica tu Bandeja de correo', res)}; 
      if(user.estado === 0) {return getDataError400('Cuenta inactiva, Contacte al Admin', res)};
      const token = generateToken(user);
      handleCredentials(storeCredentials, correo, password, res);
      return getResponse200WithData('Login correcto', token, user, res);
  } catch (e) { 
      getError500('Error', e, res);
  }
}

const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
      const payload = await verifyGoogleToken(token);
      const users = await User.findAll({ where: { correo: payload.email}});
      if (users.length === 0) {return getDataError400('usuario no encontrado', res)}
      const user = users[0];
      const jwtToken = generateToken(user);
      return getResponse200WithData('Login correcto', jwtToken, user);
  } catch (e) {
      getError500('Error', e, res);
  }
};

const forgotPassword = async (req, res) => {
  const { correo } = req.body;
  if (!correo) {return getDataError400('El correo es requerido', res);}
  try { 
      const usuario = await User.findOne({ where: { correo: correo}});
      if (!usuario) { return getDataError400('El correo no está registrado', res); }
      const token = crypto.randomBytes(20).toString('hex');
      const tokenExpiry = Date.now() + 3600000; // 1 hora
      await usuario.update({
          resetPasswordToken: token,
          resetPasswordExpires: tokenExpiry
      });
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
          if (error) { return getError500('Error al enviar el correo de restablecimiento', error, res); }
          res.cookie('resetToken', token, { maxAge: 3600000, httpOnly: true });
          res.send('Correo de restablecimiento enviado. Revisa tu bandeja de entrada.');
      });
  } catch (e) { 
      getError500('Error al procesar la solicitud:', e, res);
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!token || !password) { return getDataError400('token o contrasenia faltante', res); }
  try { 
          //const query = `SELECT * FROM usuarios WHERE resetPasswordToken = ? AND resetPasswordExpires > ?`;
      const usuario = await User.findOne({ where: {resetPasswordToken: token, resetPasswordExpires: { [Op.gt]: Date.now() }} });
      if (!usuario) { return getDataError400('El token es invalido o Expiro', res); }
      const hashPassword = await bcrypt.hash(password, 10);
      await User.update({ password: hashPassword, resetPasswordToken: null, resetPasswordExpires: null}, {where: { usuarioId: usuario.usuarioId}});
      return getResponse200WithData('Contrasenia Restablecida!', usuario, res);
  } catch(e) { 
      getError500('Error en la consulta', e, res); 
  }
};

const resetPasswordForm = (req, res) => {
  const { token } = req.params;
  res.json({ valid: true, token }); // Indica que el token es válido y envía el token al frontend
};

const updatePassword = async (req, res) => {
  const { correo, oldPassword, newPassword } = req.body;
  if (!correo || !oldPassword || !newPassword) { return getDataError400('Los campos son requeridos!', res); }
  try { 
      const usuario = await User.findOne({ where: { correo: correo}});
      if (!usuario) { return getDataError400('User no encontrado', res); }
      const validPassword = await bcrypt.compare(oldPassword, usuario.password);
      if (!validPassword) { return getDataError400('incorrecta contrasenia antigua!', res); }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await User.update({ password: hashedNewPassword}, { where: { correo: correo}} );
      return getResponse200('Contraseña actualizada exitosamente', res);
  } catch(e) { 
      getError500('Error en la consulta', e, res);
  }
};


routerAuth.post('/', auth);
routerAuth.get('/login', function(req, res, next) {
    res.render('login');
  });
routerAuth.post('/forgot-password', forgotPassword); 
routerAuth.post('/reset-password/:token', resetPassword); 
routerAuth.get('/forgot-password/:token', resetPasswordForm);
routerAuth.post('/update-password', updatePassword);
routerAuth.post('/google-login', googleLogin);


export {
  routerAuth, 
  resetPassword,
  forgotPassword,
};