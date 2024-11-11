const { response: res, request: req } = require("express");
const conexion = require("../database");
const bcrypt = require("bcrypt");


const isClientFormInfoRegistered = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from informacion where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar la inforamcion del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su inforamcion',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su inforamcion',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}

const isClientFormExperience = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from experiencia where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar los logros  del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su experiencia',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su experiencia',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}
const isClientFormAchievements = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
           
        query = 'select * from logros where cliente_id = ?';
        conexion.query(query,[id],(err,results) =>{
            if( err ){
                res.status(500).json({
                    msg:'Error al buscar la experiencia  del cliente',
                    err:err.message,
                })
                return;
            }
            if( results.length > 0 ){
                res.status(200).json({
                    msg:'El usuario ya cuenta con un registro de su logros',
                    ok:true,
                    cant:results.length
                })
                return;
            }
            res.status(200).json({
                msg:'El usuario aun no cuenta con un registro de su logros',
                ok:false,
                cant:1,
                cant:0
            })
        })       
})
}
const isClientVideo = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
    if( results[0].video == '' || results[0].video == null ){
        res.status(200).json({
            msg:'El usuario no cuenta aun con un video',
            ok:false,
            cant:0
        })
        return;
    }      
    res.status(200).json({
        msg:'El usuario ya cuenta con un video',
        ok:true,
        cant:1
    })
    return;
           
})
}
const isClientPhoto = (req, res) =>{
    let query = 'select * from usuarios where usuario_id = ?';
    const {id} = req.query;
    conexion.query(query,[id],(err, results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar el cliente',
                err,
            })
            return;
        }
    if( results[0].imagen == '' || results[0].imagen == null ){
        res.status(200).json({
            msg:'El usuario no cuenta aun con una imagen',
            ok:false,
            cant:0
        })
        return;
    }      
    res.status(200).json({
        msg:'El usuario ya cuenta con una imagen',
        ok:true,
        cant:1
    })
    return;
           
})
}

const isInversorInfo = (req, res) =>{
    const {id} = req.query
    let query = 'select * from usuarios where usuario_id = ?'
    conexion.query(query, [id], (err,results) =>{
        if( err  ){
            res.status(500).json({
                msg:'Error al buscar usuario/Usuario no encontrado',
                err
            })
            return
        }
        query = 'select id from informacion_inversionista where id_inversionista = ?';
        conexion.query(query,[id], (err,results) =>{
            if( err  ){
                res.status(500).json({
                    msg:'Error al buscar usuario/',
                    err
                })
                return
            }
            if( results.length == 0 ){
                res.status(200).json({
                    ok:false,
                    cant:0,
                    msg:'El inversor no cuenta con un registro'
                })
                return
            }
                res.status(200).json({
                    ok:true,
                    msg:'El inversor ya cuenta con un registro',
                    cant:1  
                })
        })
    })
}

const isInversorPhoto = (req, res) =>{
    const {id} = req.query
    let query = 'select * from usuarios where usuario_id = ?'
    conexion.query(query, [id], (err,results) =>{
        if( err || results.length == 0 ){
            res.status(500).json({
                msg:'Error al buscar usuario/Usuario no encontrado',
                err
            })
            return
        }
            if( !results[0].imagen ){
                res.status(200).json({
                    msg:'El usuario no cuenta con una selfie',
                    ok:false,
                    cant:0
                })
                return
            }
            res.status(200).json({
                msg:'El usuario ya cuenta con una selfie',
                ok:true,
                cant:1
            })
            return
    })
}

module.exports = {
    isClientFormInfoRegistered,
    isClientFormAchievements,
    isClientFormExperience,
    isClientVideo,
    isClientPhoto,
    isInversorInfo,
    isInversorPhoto
}