const { conexion } = require('../database.js')

async function checkInvestmentRequest() { 
    const query = `SELECT * FROM solicitudes_inversion 
    WHERE fecha_fin_pago > CURDATE() 
        AND estado_inversion != 'Rechazado' AND estado = 1`;
    conexion.query(query, function (err, results) {
        if (err) {
            res.status(500).send({
                error: err,
                message: "Error al obtener las solicitudes vencidas",
            });
        } else {
            res.status(200).json({
                data: results,
                message: "Solicitudes vencidas",
            });
        }
    });
}

module.exports = {
    checkInvestmentRequest,
}