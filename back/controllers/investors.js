const {response:res, request:req} = require('express')
const conexion = require('../database');
const bcrypt = require('bcrypt')

/**
 *  Esta funsion obtiene la lista de inversores 
 */
const getInvestors  = (req, res)=>{
    let sql = 'select * from usuarios';
    conexion.query(sql, (error, results)=>{
        if( error ){
            res.status(500).json({
                error,
            })
        }else{
            res.status(200).json({
                results,
                cant:results.length
            })
        }
    })
}

/**
 *  Esta funsion crea un inversor 
 */
const postInvestors = async (req, res) => {
    const { nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, password, acepta_terminos, categoria_persona_id, rol } = req.body;
   
    if( acepta_terminos == '0' ){
        return res.status(500).json({
            msg:'Debe aceptar las condiciones y terminos'
        })
    }
    const sql = 'INSERT INTO usuarios (nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, password, acepta_terminos, categoria_persona_id, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    let passwordHash = await bcrypt.hash(password,10);
    const values = [nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, passwordHash, acepta_terminos, categoria_persona_id, rol];
    conexion.query(sql, values, (error) => {
        if (error) {
            res.status(500).json({
                msg: 'Error en la petición',
                error: error.message 
            });
        } else {
            res.status(201).json({
                msg: 'Usuario registrado',
            });
        }
    });
};

/**
 *  Esta funsion modifica los datos mas relevantes de  un inversor 
 */
const putInvestors = async (req, res) => {
    const { nombre, apellido, numero_telefono, pais_residencia } = req.body;
    const sql = 'update usuarios set nombre=?, apellido=?, numero_telefono=?, pais_residencia=? where usuario_id = ?';
    const values = [nombre, apellido, numero_telefono, pais_residencia, req.params.id];
    conexion.query(sql, values, (error) => {
        if (error) {
            res.status(500).json({
                msg: 'Error en la petición',
                error: error.message 
            });
        } else {
            res.status(201).json({
                msg: 'Inversor actualizado',
            });
        }
    });
};

/**
 *  Esta funsion modificael estado de  un inversor 
 */
const putStateInvestors = async (req, res) => {
    let sql = `select * from usuarios where usuario_id=${req.params.id}`;
    conexion.query(sql, (error, results)=>{
        if( error ){
            res.status(500).json({
                msg:'Error al realizar la peticion'
            })
        }else{
            if(results.length == 0){
                res.status(500).json({
                    msg: `El usuario con el id ${req.params.id} no existe`
                })
            }else{
                user = results[0];
                sql = 'update usuarios set state=!state where usuario_id = ?';
                conexion.query(sql, [ req.params.id], (error) => {
                    if (error) {
                        res.status(500).json({
                            msg: 'Error en la petición',
                            error: error.message 
                        });
                    } else {
                        res.status(201).json({
                            msg: 'Estado de inversor cambiado',
                        });
                    }
                });
            }
        }
    })
    
};


module.exports = {
    getInvestors,
    postInvestors,
    putInvestors,
    putStateInvestors
}

