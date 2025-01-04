const express = require('express');
const router = express.Router();
const {connection} = require('../database');



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


router.get('/', (req, res) => {
    connection.query('SELECT * FROM ajustes', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({results});
    });
});

router.get('/ajustesTokens', (req, res) => {
    connection.query('SELECT valor_token, tipo_moneda FROM ajustes', (error, results) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({results:results[0]});
    });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso } = req.body;

    const query = 'UPDATE ajustes SET comision_fija_ganancia = ?, comision_porcentual_ganancia = ?, comision_fija_retiro = ?, comision_porcentual_retiro = ?, tiempo_minimo_inversion = ?, tiempo_maximo_inversion = ?, sancion_porcentual_retraso = ? WHERE ajuste_id = ?';

    connection.query(query, [comision_fija_ganancia, comision_porcentual_ganancia, comision_fija_retiro, comision_porcentual_retiro, tiempo_minimo_inversion, tiempo_maximo_inversion, sancion_porcentual_retraso, id], (error) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: 'Ajuste actualizado' });
    });
});

router.patch('/eliminar/:id', (req, res) => {
    const { id } = req.params;

    const query = 'UPDATE ajustes SET estado = !estado WHERE ajuste_id = ?';
    
    connection.query(query, [id], (error) => {
        if (error) {
            return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: 'Ajuste eliminado' });
    });
});


module.exports = router;