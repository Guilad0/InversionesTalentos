const { response: res, request: req } = require('express')
const conexion = require('../database');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotallySecretKey');

const auth =  (req, res) => {   
    const { correo, password, storeCredentials } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE correo = ?';
    conexion.query(sql, [correo], async (error, results) => {
        if (error) {
            res.status(500).json({
                msg: 'Error en la petición',
                error: error.message
            });
            return;
        }
        console.log(results);
        
        if (results.length === 0) {
            res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no encontrado'
            });
            return;
        }

        const user = results[0];
        const validPassword = await bcrypt.compare(password, user.password);

        if (user.verificado === 0) {
            res.status(400).json({
                msg: 'Verifica tu Cuenta'
            });
            return;
        }


        if (!validPassword) {
            res.status(400).json({
                msg: 'Credenciales incorrectas, contraseñas no coinciden'
            });
            return;
        }

        const token = jsonWebToken.sign({user},'secretkey',{expiresIn:'1h'});

        if (storeCredentials) {
            const encryptedData = cryptr.encrypt(JSON.stringify({ correo, password }));
            res.cookie('remember_me', encryptedData, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }); // 30 días
            console.log('Cookie remember_me creada:', encryptedData);
          } else {
            res.clearCookie('remember_me');
          }
          

        res.status(200).json({
            msg: 'Login correcto',
            token,
            user
        });

    })
    

}

module.exports = {
    auth
}