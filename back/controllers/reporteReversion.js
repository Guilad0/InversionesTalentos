const conexion = require("../database");

const getInversionesReversion = (req, res) => {
    const query = `
        SELECT i.inversion_id, i.monto, i.fecha_deposito, 
               u_cliente.nombre AS cliente_nombre, u_cliente.apellido AS cliente_apellido, 
               u_inversor.nombre AS inversor_nombre, u_inversor.apellido AS inversor_apellido
        FROM inversiones i
        JOIN solicitudes_inversion si ON i.cliente_id = si.cliente_id
        JOIN usuarios u_cliente ON i.cliente_id = u_cliente.usuario_id
        JOIN usuarios u_inversor ON i.inversor_id = u_inversor.usuario_id
        WHERE si.estado_inversion = 'Reversion'
        ORDER BY i.cliente_id;
    `;
    conexion.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ msg: "Error al obtener las inversiones reversion", err });
        }

        // Reestructurar el resultado para agrupar por cliente_id
        const inversionesPorCliente = results.reduce((acc, inversion) => {
            const { cliente_nombre, cliente_apellido, inversion_id, monto, fecha_deposito, inversor_nombre, inversor_apellido } = inversion;
            const cliente_id = `${cliente_nombre} ${cliente_apellido}`;

            if (!acc[cliente_id]) {
                acc[cliente_id] = { inversiones: [] };
            }
            acc[cliente_id].inversiones.push({ inversion_id, monto, fecha_deposito, inversor_nombre, inversor_apellido });
            return acc;
        }, {});

        res.status(200).json({ inversionesPorCliente });
    });
};

module.exports = {
    getInversionesReversion,
};
