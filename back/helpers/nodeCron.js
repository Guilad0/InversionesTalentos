const { conexion } = require('../database.js');


const checkInvestmentRequest = (req, res) => {
    const query = `SELECT * FROM solicitudes_inversion 
    WHERE fecha_fin_recaudacion < CURDATE() 
        AND estado_inversion != 'Rechazado' AND estado = 1`;
    conexion.query(query, function (err, results) {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error al obtener las solicitudes vencidas",
            });
        } else {
            if (results.length > 0) { 
                console.log('si hay filas que vencieron el plazo');
                for (item of results) { 
                    verifyInvestmentRequest(item);
                }
            }
            res.status(200).json({
                data: results,
                message: "Solicitudes vencidas",
            });
        }
    });
};

async function verifyInvestmentRequest(data) { 
    const query = `
    SELECT SUM(monto) AS total
    FROM inversiones
    WHERE solicitud_inv_id = ? AND estado = 1
    `;
    conexion.query(query, [data.id], (err, results) => { 
        if (err) {
            console.error("Error ejecutando la consulta:", err);
            return;
        }
        const total = results[0].total || 0;
        if (total >= data.monto) {
            console.log(total+'===' + data.monto);
            console.log("El monto es suficiente.");
            //pasar la solicitud de inversion a un estado acorde
        } else {
            console.log("El monto no es suficiente.");
            revertInvesmentRequest(data); 
        }
    })
}

async function revertInvesmentRequest(data) { 
    const updateQuery = `
    UPDATE solicitudes_inversion 
    SET aprobado = 'Rechazado'
    WHERE id = ?
    `;

    const query = `
    SELECT * FROM inversiones
    WHERE solicitud_inv_id = ? AND estado = 1
    `;

    conexion.query(updateQuery, [data.id], (err) => {
        if (err) {
            console.error("Error actualizando el estado de la solicitud:", err);
            return;
        }
        console.log("Estado de la solicitud cambiado a rechazado.");

        conexion.query(query, [data.id], (err, results) => { 
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
        })
    
    });
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


module.exports = {
    checkInvestmentRequest,
}