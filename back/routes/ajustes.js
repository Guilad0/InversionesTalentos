const express = require('express');
const router = express.Router();
const {connection} = require('../database');
const { Ajuste } = require('../models/mainExport.js');
const { resError500, res200, res200WithData, } = require('../helpers/response.js');


router.post('/', (req, res) => {
    const {
        comision_fija_ganancia,
        comision_porcentual_ganancia,
        comision_fija_retiro,
        comision_porcentual_retiro,
        tiempo_minimo_inversion,
        tiempo_maximo_inversion,
        sancion_porcentual_retraso
    } = req.body;
    const query = 'INSERT INTO ajustes (comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso], (error, results) => {
        if (error) { return res.status(500).json({ error: error.message }); }
        res.status(201).json({ message: 'Ajuste creado', id: results.insertId });
    });
});


router.get('/', async (req, res) => {
    try { 
        const ajustes = await Ajuste.findAll();
        res.status(200).json({ajustes});
    } catch(e) {
        resError500('Error al obtener ajustes!', e, res);
    }
});

router.get('/ajustesTokens', async (req, res) => {
    try { 
        const ajustes = await Ajuste.findAll({ attributes: ['valor_token', 'tipo_moneda'] });
        res.status(200).json({results:ajustes[0]});
    } catch(e) { 
        resError500('Error al obtener ajustes!', e, res);
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso } = req.body;
    const query = 'UPDATE ajustes SET comision_fija_ganancia = ?, comision_porcentual_ganancia = ?, comision_fija_retiro = ?, comision_porcentual_retiro = ?, tiempo_minimo_inversion = ?, tiempo_maximo_inversion = ?, sancion_porcentual_retraso = ? WHERE ajuste_id = ?';
    connection.query(query, [comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso, id], (error) => {
        if (error) { return res.status(500).json({ error: error.message }); }
        res.status(200).json({ message: 'Ajuste actualizado' });
    });
});

router.patch('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'UPDATE ajustes SET estado = !estado WHERE ajuste_id = ?';
    connection.query(query, [id], (error) => {
        if (error) { return res.status(500).json({ error: error.message }); }
        res.status(200).json({ message: 'Ajuste eliminado' });
    });
});


module.exports = router;