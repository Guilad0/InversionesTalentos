import User from "./userModel.js";
import Ajuste from './ajusteModel.js'
import CategoriaPersona from './categoriaPersonasModel.js'
import Informacion from "./informacionModel.js";
import InformacionInversionista from "./informacionInversionistaModel.js";
import Experiencia from "./experienciaModel.js";
import Contacto from "./contactoModel.js";
import Logro from './logroModel.js';
import SolicitudInversion from "./solicitudesInversionModel.js";
import Inversion from './inversionModel.js'
import Movimiento from "./movimientoModel.js";


CategoriaPersona.hasMany(User, { foreignKey: 'categoriaPersonaId' });
User.belongsTo(CategoriaPersona, { foreignKey: 'categoriaPersonaId' });

export {
    User,
    Ajuste,
    CategoriaPersona,
    Informacion, 
    InformacionInversionista,
    Experiencia,
    Contacto,
    Logro,
    SolicitudInversion,
    Inversion,
    Movimiento,
};
