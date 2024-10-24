const { response: res, request: req } = require('express')
const conexion = require('../database');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const { uploadFile } = require('../helpers/uploadImage');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const transporter = require('../helpers/mailer');
const crypto = require('crypto');

cloudinary.config(process.env.CLOUDINARY_URL)

/**
 *  Esta funsion obtiene la lista de todos los usuarios
 */
const getUsers = (req, res) => {
    let sql = 'select * from usuarios';
    conexion.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                error,
            })
        } else {
            res.status(200).json({
                results,
                cant: results.length
            })
        }
    })
}



const getAllClientesWithInfo = (req, res) => {
    let query = `
    SELECT 
    u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.imagen, 
        u.rol, 
        i.ocupacion, 
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision,
        c.nombre as categoria
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
         LEFT JOIN 
        categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
    WHERE 
        u.rol = "cliente";
    `;
    
    conexion.query(query, (err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });
}



const getAllClientesByCategory = async (req, res) => {
    let query = `
    SELECT 
    u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.imagen, 
        u.rol, 
        i.ocupacion, 
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision,
        c.nombre as categoria
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
        LEFT JOIN 
        categoria_personas AS c ON u.categoria_persona_id = c.categoria_persona_id
    WHERE 
        u.rol = "cliente" and u.categoria_persona_id = ?;
    ;
    `;
    
    conexion.query(query, [req.params.id],(err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });

}


const getAllClientesByFilterName = async (req, res) => {
    const searchTerm = req.params.id || '';
    const searchPattern = `${searchTerm}%`; 
    let query = `
    SELECT 
        u.usuario_id,
        u.nombre, 
        u.apellido, 
        u.correo, 
        u.categoria_persona_id,
        u.username, 
        u.pais_residencia,
        u.edad, 
        u.imagen, 
        u.rol, 
        i.ocupacion, 
        i.descripcion, 
        i.monto_inversion, 
        i.cantidad_maxima_inversiones,
        i.preparacion, 
        i.estudios, 
        i.vision
    FROM 
        usuarios AS u
    LEFT JOIN 
        informacion AS i ON u.usuario_id = i.cliente_id
    WHERE 
        u.rol = "cliente" and u.nombre like  ?;
    ;
    `;
    
    conexion.query(query, [searchPattern],(err, results) => {
        if (err) {
            res.status(500).json({
                msg: 'Error al buscar clientes'
            });
            return;
        }
        res.status(200).json({
            results,
            cant: results.length
        });
    });

}



/**
 *  Esta funsion obtiene la lista de todos los usuarios por su rol
 */
const getUsersByRol = (req, res) => {
    let sql = 'select * from usuarios where rol=?';
    conexion.query(sql, [req.params.rol], (error, results) => {
        if (error) {
            res.status(500).json({
                error,
            })
        } else {
            res.status(200).json({
                results,
                cant: results.length
            })
        }
    })
}

/**
 *  Esta funsion crea un inversor, cliente
 */
const postUser = async (req, res) => {
    const { nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, password, acepta_terminos, categoria_persona_id, rol } = req.body;

    if (acepta_terminos == '0') {
        return res.status(500).json({
            msg: 'Debe aceptar las condiciones y terminos'
        })
    }
    const query2 = `SELECT * FROM usuarios WHERE correo = ?`;
    conexion.query(query2, [correo], async (error, results) => {
        if (results.length > 0) {
            return res.status(500).json({
                msg: 'El correo ya esta en uso'
            })
        }
        const sql = 'INSERT INTO usuarios (nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, password, acepta_terminos, categoria_persona_id, rol, cod_verificacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        let passwordHash = await bcrypt.hash(password, 10);
        const verificationCode = crypto.randomBytes(20).toString('hex');
        const values = [nombre, apellido, correo, codigo_pais, numero_telefono, pais_residencia, passwordHash, acepta_terminos, categoria_persona_id, rol, verificationCode];

        conexion.query(sql, values, (error) => {
            console.log(values)
            if (error) {
                return res.status(500).send(error);
            } else{
                const mailOptions = {
                    from: process.env.GG_EMAIL,
                    to: correo,
                    subject: 'Verifica tu cuenta',
                    text: `Tu código de verificación es: ${verificationCode}`,
                    html: `<!DOCTYPE html>
                            <html lang="es">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>Bienvenido</title>
                            </head>
                            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                                <div style="background-color: #fff; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                                    <div style="background-color: #4CAF50; padding: 10px; border-radius: 10px 10px 0 0; text-align: center; color: white;">
                                        <h1 style="margin: 0;">¡Bienvenido a Nuestra Plataforma!</h1>
                                    </div>
                                    <div style="padding: 20px;">
                                        <p>Hola,</p>
                                        <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
                                        <p>Aqui encontrarás el código de verificación para verificar tu cuenta:</p>
                                        <p style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"> ${verificationCode}</p>
                                    </div>
                                    <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                                        <p>&copy; 2024 Tu Compañía. Todos los derechos reservados.</p>
                                    </div>
                                </div>
                                <div style="padding: 20px;">
                                    <p>Hola,</p>
                                    <p>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
                                    <p>Aqui encontrarás el código de verificación para verificar tu cuenta:</p>
                                    <p style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"> ${verificationCode}</p>
                                </div>
                                <div style="text-align: center; font-size: 12px; color: #777; margin-top: 20px;">
                                    <p>&copy; 2024 Tu Compañía. Todos los derechos reservados.</p>
                                </div>
                            </div>
                        </body>
                        </html>
                        `
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) return res.status(500).send('Error al enviar el correo de verificación');
                res.send('Registro exitoso, revisa tu correo para verificar tu cuenta.');
            });

        
            }
            
        });
    })

};

// Ruta de verificación
const verifyEmail = ((req, res) => {
    const { correo, verificationCode } = req.body;
 
    const query = `SELECT * FROM usuarios WHERE correo = ? AND cod_verificacion = ?`;
    conexion.query(query, [correo, verificationCode], (err, results) => {
        if (err) return res.status(500).send('Error al verificar el código');
        if (results.length === 0) return res.status(400).send('Correo no encontrado');
 
        const updateQuery = `UPDATE usuarios SET verificado = 1 WHERE correo = ?`;
        conexion.query(updateQuery, [correo], (updateErr, updateResults) => {
            if (updateErr) return res.status(500).send('Error al actualizar el estado de verificación');
            res.send('Verificación exitosa, tu cuenta está ahora activa.');
        });
    });
});


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
    conexion.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                msg: 'Error al realizar la peticion'
            })
        } else {
            if (results.length == 0) {
                res.status(500).json({
                    msg: `El usuario con el id ${req.params.id} no existe`
                })
            } else {
                user = results[0];
                sql = 'update usuarios set estado=!estado where usuario_id = ?';
                conexion.query(sql, [req.params.id], (error) => {
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
const addInfClient = (req, res) => {
    const { cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;
    let query = 'select * from usuarios where usuario_id=?';
    conexion.query(query, [cliente_id], (err, results) => {
        if (err) {
            res.status(500).json({
                err
            })
            return;
        }

        if (results.length == 0) {
            res.status(500).json({
                msg: 'El usuario no existe'
            })
            return;
        }
        query = 'select * from informacion where cliente_id = ?';
        conexion.query(query, [cliente_id], (err, data) => {
            if (err) {
                res.status(500).json({
                    err
                })
                return;
            }

            if (data.length > 0) {
                res.status(500).json({
                    msg: 'El usuario ya cuenta con una informacion'
                })
                return;
            }
            query = 'insert into informacion (cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision) values (?,?,?,?,?,?,?,?)';
            const values = [cliente_id, ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision];
            conexion.query(query, values, (err) => {
                if (err) {
                    res.status(500).json({
                        err
                    })
                    return;
                }
                res.status(201).json({
                    msg: 'Informacion agregada'
                })
            })

        })


    })


}

/**
 *  Esta funsion modifica un usuario de tipo cliente
 */
const putClientInfo = (req, res) => {
    const { ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision } = req.body;
    let query = `select * from informacion where cliente_id = ${req.params.id}`;
    conexion.query(query, (err, data) => {
        if (err) {
            res.status(400).json({
                err
            })
            return;
        }
        if (data.length == 0) {
            res.status(400).json({
                msg: 'El usuario no cuenta con informacion'
            })
            return;
        }
        query = 'update informacion set   ocupacion=?, descripcion=?, monto_inversion=?, cantidad_maxima_inversiones=?, preparacion=?, estudios=?, vision=? where cliente_id=?'
        const values = [ocupacion, descripcion, monto_inversion, cantidad_maxima_inversiones, preparacion, estudios, vision, req.params.id];
        conexion.query(query, values, (err) => {
            if (err) {
                res.status(400).json({
                    err
                })
                return;
            }
            res.status(201).json({

                msg: 'Inforamcion actualizada'
            })
        })
    })


};


const changeStateUser = (req, res) => {
    let query = 'select * from usuarios where usuario_id = ? ';
    conexion.query(query, [req.params.id], (err, data) => {
        if (err) {
            res.status(404).json({
                msg: 'Error al buscar usuarios'
            })
            return
        }
        if (data.length == 0) {
            res.status(404).json({
                msg: 'Usuario no encontrado'
            })
            return
        }
        query = 'update usuarios set estado=!estado where usuario_id = ?';
        let estado = data[0].estado;
        conexion.query(query, [req.params.id], err => {
            if (err) {
                res.status(404).json({
                    msg: 'Error al cambiar estado'
                })
                return
            }
            res.status(201).json({
                msg: (estado == '1') ? 'Categoria no activa' : 'Categoria activa'
            })
        })

    })
}


/**
 *  Esta funsion obtiene la informacion del usaurio tipo cliente por su id
 */
const getInfoClientById = (req, res) => {
    let sql = 'select * from informacion where cliente_id=?';
    conexion.query(sql, [req.params.id], (error, results) => {
        console.log(results);
        if (error) {
            res.status(500).json({
                error,
            })
            return
        }

        res.status(500).json({
            data: results,
            cant: results.length
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
const createUrlImg = (req, res) => {
    let query = 'select * from usuarios where usuario_id=?';
    conexion.query(query, [req.params.id], (err, data) => {
        if (err) {
            res.status(500).json({
                err,
            });
            return;
        }
        if (data.length == 0) {
            res.status(500).json({
                err,
            });
            return;
        }
        let userImg = data[0].imagen;
        const pathImg = path.join(__dirname, '../uploads/images/', userImg);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg)
        }
    })
}

/**
 * funcion sube la iamgen al servidor cloudinary
 */
const uploadimageUserCloudinary = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }

    let query = 'SELECT * FROM usuarios WHERE usuario_id = ?';
    conexion.query(query, [req.params.id],async (err, results) => {
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
            if (extension !== 'jpg' && extension !== 'png' && extension !== 'jpeg') {
                return res.status(404).json({
                    msg: 'Extensiones de imagen no permitidas',
                });
            }
            cloudinary.uploader.destroy(`clients/${'clients/'+req.params.id}`);
            const { tempFilePath } = req.files.image;
            const result = await cloudinary.uploader.upload(tempFilePath, {
                    public_id: req.params.id,
                    folder: 'clients'
            });
            const { secure_url } = result;
            query = 'update usuarios set imagen = ? where usuario_id = ?';
            conexion.query(query, [secure_url, req.params.id], async (err) => {
                if (err) {
                    return res.status(404).json({
                        msg: 'Usuario no encontrado/Error al guardar nombre de imagen',
                    });
                }
                
                res.status(201).json({
                    url: secure_url
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

const handleEmail = (req, res) => {
    const correo = req.query.correo;
    const query = `SELECT * FROM usuarios WHERE correo = ?;`;
   
    conexion.query(query, [correo], (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error en la consulta" });
      }
   
      if (results.length > 0) {
        res.send({ existe: true });
      } else {
        res.send({ existe: false });
      }
    });
  };
  const handleTelefono = (req, res) => {
    const telefono = req.query.telefono;
    const query = `SELECT * FROM usuarios WHERE numero_telefono = ?;`;
   
    conexion.query(query, [telefono], (error, results) => {
      if (error) {
        return res.status(500).send({ message: "Error en la consulta" });
      }
   
      if (results.length > 0) {
        res.send({ existe: true });
      } else {
        res.send({ existe: false });
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
    changeStateUser,
    verifyEmail,
    getAllClientesByCategory,
    getAllClientesByFilterName,
    handleEmail,
    handleTelefono
}

