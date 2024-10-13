const { response: res, request: req } = require('express')
const conexion = require('../database');

const getContact = (req, res) => {
    let sql = 'select * from contacto';
    conexion.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                error
            });
        } else {
            res.status(200).json({
                results,
                cant: results.length
            });
        }
    });
}
const postContact = async (req, res) => {
    const { nombre, apellido, email, telefono, comentarios } = req.body;
    const sql = `INSERT INTO contacto(nombre, apellido, email, telefono, comentarios,estado) VALUES (?, ?, ?, ?, ?, 0)`;
    let values = [nombre, apellido, email,telefono,comentarios]

    conexion.query(sql, values, (error) => {
        if (error) {
            res.status(500).json({
                message: 'Error al realizar la peticion',
                error: error.message
            })
        } else {
            res.status(200).send({
                message: 'Comentario enviado',
                data: values.length,
                data: values
                
            })
            
        }
    });

}
const putStateContact = async (req, res) => {
    let sql = `select * from contacto where contacto_id=${req.params.id}`;
    conexion.query( sql, (error, results) => {
        if (error) {
            res.status(500).json({
                message: 'Error al realizar la peticion',
                error: error.message
            })
        }else{
            if(results.length == 0){
                res.status(500).json({
                    message: `El contacto con el id ${req.params.id} no existe`,
                })

            }
            else{
                let sql2 = `update contacto set estado = !estado where contacto_id = ?`;
                let values2 = [req.params.id];
                conexion.query(sql2, values2, (error) => {
                    if (error) {
                        res.status(500).send({
                            message: 'Error al realizar la peticion',
                            error: error.message
                        })
                    } else {
                        res.status(200).send({
                            message: 'Estado contacto cambiado',
                            data: values2.length,
                            data: values2
                            
                        })
                        
                    }
                })
            }
        }
});

}

const sendEmail  = async (req, res)=>{

}

module.exports = {
    getContact,
    postContact,
    putStateContact,
    sendEmail
}
