const {response:res, request:req} = require('express')
const conexion = require('../database');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../helpers/uploadImage');
const { v4: uuidv4 } =require('uuid');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL)

/**
 *  Esta funsion obtiene la lista de todos los usuarios
 */
const getUsers  = (req, res)=>{
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
 * Obtiene todos los clientes con su informacion
 */
const getAllClientesWithInfo  =async (req, res)=>{
    let sql = 'select * from usuarios where rol="cliente"';
    try {
        conexion.query(sql, (err, data) => {
            if (err) {
                res.status(500).json({
                    msg:'error al buscar clientes'
                })
                return;
            }
            const usersPromise = data.map( c =>{
                return new Promise((resolve, reject)=>{
                    sql = 'select * from informacion where cliente_id=? ';
                    conexion.query(sql, [c.usuario_id], (err, result)=>{
                        if( err ){
                            return reject(err)
                        }
                        c.informacion = result;
                        resolve(c)
                    })
                })
            })
            Promise.all(usersPromise)
            .then( data =>{
                res.status(200).json({
                    clientes:data,
                    cantidad:data.length
                })
            })
            .catch( err =>{
                res.status(500).json({ msg:'Error al obtener informacion del usuario' })
            })
            
        });
    } catch (error) { 
        res.status(500).json({ msg: 'Error en el servidor' });
    }
    
}


/**
 *  Esta funsion obtiene la lista de todos los usuarios por su rol
 */
const getUsersByRol  = (req, res)=>{
    let sql = 'select * from usuarios where rol=?';
    conexion.query(sql,[req.params.rol], (error, results)=>{
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
 *  Esta funsion crea un inversor, cliente
 */
const postUser = async (req, res) => {
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
                sql = 'update usuarios set estado=!estado where usuario_id = ?';
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

/**
 *  Esta funcion registra la informacion del cliente
 */
const addInfClient = (req, res)=>{
    const { cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;
    let query = 'select * from usuarios where usuario_id=?';
    conexion.query(query,[cliente_id], (err, results)=>{
        if(err){
            res.status(500).json({
                err
            })
            return;
        }

        if( results.length == 0 ){
            res.status(500).json({
                msg:'El usuario no existe'
            })
            return;
        }
        query = 'select * from informacion where cliente_id = ?';
        conexion.query(query,[cliente_id], (err,data)=>{
            if(err){
                res.status(500).json({
                    err
                })
                return;
            }
    
            if( data.length > 0 ){
                res.status(500).json({
                    msg:'El usuario ya cuenta con una informacion'
                })
                return;
            }
            query = 'insert into informacion (cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision) values (?,?,?,?,?,?,?,?)';
        const values = [cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision];
        conexion.query(query, values, (err)=>{
        if( err ){
            res.status(500).json({
                err
            })
            return;
        }
        res.status(201).json({
            msg:'Informacion agregada'
        })
    })
            
        })

        
    })

    
}

/**
 *  Esta funsion modifica un usuario de tipo cliente
 */
const putClientInfo = (req, res) => {
    const {  ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;
    let query = `select * from informacion where cliente_id = ${req.params.id}`;
    conexion.query(query, (err,data)=>{
        if( err ){
            res.status(400).json({
                err
            })
            return;
        }
        if( data.length == 0 ){
            res.status(400).json({
                msg:'El usuario no cuenta con informacion'
            })
            return;
        }
        query = 'update informacion set   ocupacion=?, descripcion=?, monto_inversion=?, cantidad_maxima_inversiones=?, preparacion=?, estudios=?, vision=? where cliente_id=?'    
        const values = [ ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision, req.params.id];
        conexion.query(query, values, (err)=>{
            if( err ){
                res.status(400).json({
                    err
                })
                return;
            }
            res.status(201).json({
                
                msg:'Inforamcion actualizada'
            })
        })
    })
    

};


const changeStateUser = (req, res)=>{
    let query = 'select * from usuarios where usuario_id = ? ';
    conexion.query(query,[req.params.id],(err, data)=>{
        if(err){
            res.status(404).json({
                msg:'Error al buscar usuarios'
            })
            return
        }
        if( data.length == 0 ){
            res.status(404).json({
                msg:'Usuario no encontrado'
            })
            return
        }
        query = 'update usuarios set state=!state where usuario_id = ?';
        let state = data[0].state;
        conexion.query(query,[req.params.id], err=>{
            if(err){
                res.status(404).json({
                    msg:'Error al cambiar estado'
                })
                return
            }
            res.status(201).json({
                msg:(state == '1')? 'Categoria no activa':'Categoria activa'
            })
        })

    })
}


/**
 *  Esta funsion obtiene la informacion del usaurio tipo cliente por su id
 */
const getInfoClientById = (req, res)=>{
    let sql = 'select * from informacion where cliente_id=?';
    conexion.query(sql, [req.params.id],(error, results)=>{
        console.log(results);
        if( error ){
            res.status(500).json({
                error,
            })
            return
        }
           
            res.status(500).json({
                data:results,
                cant:results.length
            })
        
    })
}


/**
 *  Esta funsion crea la imagen de la tabla usuarios con el nombre de la 
 * imagen encriptada  y ademas  sube la imagen a  la carpeta uploads/images
 */
const uploadimageUser = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }

    let query = 'SELECT * FROM usuarios WHERE usuario_id = ?';
    conexion.query(query, [req.params.id], async (err, results) => {
        if (err) {
            res.status(500).json({
                err,
            });
            return;
        }

        if (results.length === 0) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }

        const oldImgPath = results[0].imagen; 
        if (oldImgPath) {
            const fullPath = path.join(__dirname, '../uploads/images', oldImgPath); 
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen anterior:', err);
                }
            });
        }

        try {
            const imgPath = await uploadFile(req.files);
            query = `UPDATE usuarios SET imagen = ? WHERE usuario_id = ?`;
            conexion.query(query, [imgPath, req.params.id], (err) => {
                if (err) {
                    res.status(500).json({
                        err,
                    });
                    return;
                }
                res.status(201).json({
                    ok: 'Imagen cargada',
                });
            });

        } catch (err) {
            res.status(400).json({
                err
            });
        }
    });
};

/**
 * Con esta funcion se puede acceder a la url de la imagen
 */
const createUrlImg = (req, res )=>{
    let query = 'select * from usuarios where usuario_id=?';
    conexion.query(query,[req.params.id], (err,data)=>{
        if (err) {
            res.status(500).json({
                err,
            });
            return;
        }
        if( data.length == 0 ){
            res.status(500).json({
                err,
            });
            return;
        }
        let userImg = data[0].imagen;
        const pathImg = path.join(__dirname,'../uploads/images/', userImg );
        if(fs.existsSync(pathImg)){
            return res.sendFile( pathImg )
        }
    })

}   

/**
 * funcion sube la iamgen al servidor cloudinary
 */
const uploadimageUserCloudinary =  (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }

    let query = 'SELECT * FROM usuarios WHERE usuario_id = ?';
    conexion.query(query, [req.params.id],  (err, results) => {
        if (err) {
            res.status(500).json({
                err,
            });
            return;
        }
        console.log(results);
        if (results.length === 0) {
            return res.status(404).json({
                msg: 'Usuario no encontrado',
            });
        }

        try {
            let extension = req.files.image.name.split('.');
            extension = extension[extension.length - 1]; 
            console.log(extension);
            let img = results[0].imagen;
            let nameFile = uuidv4() + '.'+extension;
            query = 'update usuarios set imagen = ? where usuario_id = ?';
            conexion.query(query,[nameFile,req.params.id], async(err) =>{
               if(err){
                return res.status(404).json({
                    msg: 'Usuario no encontrado',
                });
               }
                cloudinary.uploader.destroy(`clients/${img}`);
                const {tempFilePath} =  req.files.image
                const result = await cloudinary.uploader.upload(tempFilePath, {
                    public_id: nameFile,  
                    folder: 'clients' 
                });
                const { secure_url } = result;
              res.status(201).json({
                    url:secure_url
              })
            })

        } catch (error) {
            return res.status(500).json({
                msg: 'Error al procesar la imagen',
                error
            });
        }
        
     });
};



module.exports = {
    getUsers,
    postUser,
    putInvestors,
    putStateInvestors,
    getUsersByRol,
    uploadimageUser,
    addInfClient,
    getInfoClientById,
    putClientInfo,
    createUrlImg,
    uploadimageUserCloudinary,
    getAllClientesWithInfo,
    changeStateUser
}

