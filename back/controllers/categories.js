const conexion = require('../database');
const {response:res, request:req} = require('express')
const multer = require('multer');
const { uploadFile } = require('../helpers/uploadImage');
const { v4: uuidv4 } =require('uuid');
const cloudinary = require('cloudinary').v2;
/**
obtiene la lista de categorias
 */

const getCategoies = (req, res)=>{
    let query = 'select * from categoria_personas';
    conexion.query(query, (err, results)=>{
        if( err ){
            res.status(500).json({
                err,
                msg:'Error al iniciar peticion'
            })
            return;
        }
        res.status(200).json({
            results,
            cantidad:results.length
        })
    })
}


/**
 * 
Actualiza el nombre de la categoria
 */
const putCategorie = (req, res)=>{
    const {nombre} = req.body;
    console.log(nombre);
    let query = 'select * from categoria_personas where categoria_persona_id=?';
    conexion.query(query,[req.params.id], (err,data)=>{
        if( err ){
            res.status(500).json({
                err,
                msg:'Categoria no encontrada'
            })
            return;
        }
        query = 'update categoria_personas set nombre = ? where categoria_persona_id=?';
        conexion.query(query,[nombre, req.params.id], (err)=>{
            if( err ){
                res.status(500).json({
                    err,
                    msg:'Error al actualizar nombre'
                })
                return;
            }
            res.status(201).json({
                err,
                msg:'Categoria actualizada'
            })
        })
    })
}

const changeState = (req, res)=>{
        let query = 'select * from categoria_personas WHERE categoria_persona_id = ?';
        conexion.query(query,[req.params.id], (err, data)=>{
            if( err ){
                res.status(500).json({
                    err,
                    msg:'Error al buscar categorias'
                })
                return;
            }
            if( data.length == 0 ){
                res.status(404).json({
                    err,
                    msg:'Categoria no encontrada'
                })
                return;
            }
            let state = data[0].estado;
            console.log(state);
            query = `update categoria_personas set estado=!estado`;
            conexion.query(query, err=>{
                if( err ){
                    res.status(500).json({
                        err,
                        msg:'Error al actualizar estado'
                    })
                    return;
                }
                res.status(201).json({
                    msg:(state == '1')? 'Categoria no activa':'Categoria activa'
                })
            })
        })

}

/**
 * actualziar iamgen de cloudinary
 */
const updateImgCategory = (req, res)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }
    let query = 'select * from categoria_personas where categoria_persona_id = ?'
    conexion.query(query,[req.params.id], (err,data)=>{
        if( err ){
            res.status(400).json({
                msg: 'Categoria no encontrada'
            });
            return;
        }
        let img = data[0].imagen;
        let extension = req.files.imagen.name.split('.');
        extension = extension[extension.length - 1]; 
        if( extension == 'png' || extension == 'jpg' || extension == 'jpeg'){
            try {
                let query = 'update categoria_personas set imagen=? where categoria_persona_id = ?';
                let nameFile = uuidv4() + '.'+extension;
                conexion.query(query,[nameFile, req.params.id],async (error)=>{
                    if(error){
                        return res.status(404).json({
                            msg: 'Error en la consulta',
                        });
                    }
                    cloudinary.uploader.destroy(`categories/${img}`);
                    const {tempFilePath} =  req.files.imagen;
                    const result = await cloudinary.uploader.upload(tempFilePath, {
                            public_id: nameFile,  
                            folder: 'categories' 
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
        }else{
            
             res.status(500).json({
                msg: 'Extension no valida',
                
            });
            return
           }
        
    })
}


/* 
gaurda una categoria yy sube la imagen a cloudnary
*/

const saveCategory = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.imagen) {
        res.status(400).json({
            msg: 'Sin archivos para subir'
        });
        return;
    }

    let extension = req.files.imagen.name.split('.');
    extension = extension[extension.length - 1]; 
   if( extension == 'png' || extension == 'jpg' || extension == 'jpeg'){
    try {
    
        
        let query = 'insert into categoria_personas (imagen, nombre) values (?,?)';
        let nameFile = uuidv4() + '.'+extension;
        conexion.query(query,[nameFile, req.body.nombre],async (error)=>{
            if(error){
                return res.status(404).json({
                    msg: 'Error en la consulta',
                });
            }
            const {tempFilePath} =  req.files.imagen;
            const result = await cloudinary.uploader.upload(tempFilePath, {
                    public_id: nameFile,  
                    folder: 'categories' 
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
}else{
    
     res.status(500).json({
        msg: 'Extension no valida',
        
    });
    return
   }

};


module.exports = {
    getCategoies,
    saveCategory,
    putCategorie,
    changeState,
    updateImgCategory
}
