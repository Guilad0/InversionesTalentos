import path from 'path';
import { v4 as uuidv4 }from 'uuid';

const uploadFile = ( { image }, estensiones = [ 'png','jpeg','jpg' ], folder='images')=>{
    return new Promise((resolve, reject)=>{
        
        let extension = image.name.split('.');
        extension = extension[extension.length - 1]; 
        if( !estensiones.includes(extension) ){
            return reject('Extencion no valida, las extensiones validas son jpg, jpeg, png')
        }
        
        const nameFile = uuidv4() + '.' +extension ;
        const uploadPath =path.join( __dirname, '../uploads/',folder, nameFile);  
        image.mv(uploadPath, (err)=> {
          if(err){
            return  reject(err)
          }
            resolve(nameFile)
        });
    })

}

export {
    uploadFile
};