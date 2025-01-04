import { col, fn, Op } from 'sequelize';
import { sequelize } from '../database.js';
import { Inversion, SolicitudInversion } from '../models/mainExport.js'
import { getDataError400, getError500, getResponse200WithData } from './Response.js';

const checkInvestmentRequest = async (req, res) => {
    try { 
        const solicitudes = await SolicitudInversion.findAll({
            where: { 
                fechaFinRecaudacion: {
                    [Op.lt]: new Date(), // > date.Now
                    estadoInversion: {
                    [Op.ne]: 'Rechazado', // != 'Rechazado
                    },
                    estado: 1,  // === 1
                }
            }
        });
        if (solicitudes.length > 0) { 
            console.log('si hay filas que vencieron el plazo');
            for (item of results) { 
                verifyInvestmentRequest(item);
            }
        }
        getResponse200WithData('Ok', solicitudes, res);
    } catch(e) { 
        getError500('Error en la consulta!', e, res); 
    }
};

async function verifyInvestmentRequest(data) { 
    const totalSuma = await Inversion.findAll({
        attributes: [
            [fn('SUM', col('monto')), 'total']
          ],
          where: {
            solicitudInvId: data.id,
            estado: 1
          }
    });
        const total = totalSuma.total || 0;
        if (total >= data.monto) {
            console.log(total+'===' + data.monto);
            console.log("El monto es suficiente.");
            //pasar la solicitud de inversion a un estado acorde
        } else {
            console.log("El monto no es suficiente.");
            revertInvesmentRequest(data); 
        }
}

async function revertInvesmentRequest(data) { 
    const [updateSolicitudInv] = await SolicitudInversion.update({
        aprobado: 'Rechazado'}, {where: { id: data.id}}  );
    const inversiones = await Inversion.findAll({
        where: {solicitudInvId: data.id, estado: 1} });
    if (updateSolicitudInv === 0) {
        return getDataError400('Error actualizando el estado de la solicitud:', res);
    }
    console.log("Estado de la solicitud cambiado a rechazado.");
    if (err) {
        console.error("Error ejecutando la consulta:", err);
        return;
    }
    if(results.length > 0) { 
        for ( item of results) {
            revertInvesments(item); 
        }
    } else {
        console.log("no hay inversiones no se revierte nada"); 
    }
}

async function revertInvesments(data) {
    const query = `
    SELECT * FROM inversiones
    WHERE solicitud_inv_id = ? AND estado = 1
    `;
    conexion.query(query, [data.id], (err, results) => { 
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return;
        }
        if(results.length > 0) { 
            for ( item of results) {
                revertInvestmentOfUser(item); 
            }
        } else {
            console.log("no hay inversiones no se revierte nada");
        }
    })
}

async function revertInvestmentOfUser(data) {
    const inversionId = data.inversion_id;
    const inversorId = data.inversor_id; 
    const montoInversion = data.monto; 
    const updateQuery = `
        UPDATE inversiones
        SET estado = 0
        WHERE id = ?
    `;
    const insertMovimientoQuery = `
        INSERT INTO movimientos (tipo, monto, descripcion, fecha_solicitud,
            estado, usuario_id, token)
        VALUES ('ingreso', 0, 'reversion', NOW(), 1, ?, ?);
    `;
    conexion.query(updateQuery, [inversionId], (updateErr, updateResult) => {
        if (updateErr) {
            console.error(`Error al actualizar inversión ${inversionId}:`, updateErr);
            return;
        }

        console.log(`inversion ${inversionId} actualizada a estado 0.`);

        conexion.query(insertMovimientoQuery, [inversorId, montoInversion], (insertErr, insertResult) => {
            if (insertErr) {
                console.error(`Error al insertar movimiento para inversor ${inversorId}:`, insertErr);
                return;
            }
            console.log(`Movimiento de ingreso registrado para el inversor ${inversorId}.`);
        });
    });
}


export {
    checkInvestmentRequest,
};