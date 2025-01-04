import express from 'express';
import {sequelize} from '../database.js';
import transporter from '../helpers/mailer.js';
import { getDataError400, getError500, getResponse200, getResponse200WithData } from '../helpers/Response.js';
import { Contacto } from '../models/mainExport.js';
import { Op } from 'sequelize';
    


var router = express.Router();

const getContact = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 7;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';
    try { 
        const { rows: results, count: totalItems } = await Contacto.findAndCountAll({
            where: {
              [Op.or]: [
                { nombre: { [Op.like]: `%${search}%` } },
                { apellido: { [Op.like]: `%${search}%` } },
                { email: { [Op.like]: `%${search}%` } },
              ],
            },
            limit: limit,
            offset: offset,
        });
        const totalPages = Math.ceil(totalItems / limit);
        res.status(200).json({
            results,
            currentPage: page,
            totalPages,
            totalItems,
            itemsPerPage: limit,
          });
    } catch(e) { 
        getError500('Error en la consulta!', e, res); 
    }
};

const postContact = async (req, res) => {
    const { nombre, apellido, email, telefono, comentarios } = req.body;
    if (!nombre || !apellido || !email || !telefono || !comentarios) { return getDataError400('Todos los campos son obligatorios', res); }
    try { 
        const insertContact = await Contacto.create({
            nombre:nombre, apellido:apellido, email:email,
            telefono:telefono, comentarios:comentarios,
            estado: 0,
        })
        const values = [nombre, apellido, email, telefono, comentarios];
        await transporter.sendMail({
            from: email,
            to: process.env.GG_EMAIL,
            subject: `Nuevo comentario de ${nombre} ${apellido}`,
            text: `Has recibido un nuevo comentario:\n\nNombre: ${nombre} ${apellido}\nEmail: ${email}\nTeléfono: ${telefono}`,
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Comentarios Clientes!!</title>
                        <link rel="preconnect" href="https://fonts.googleapis.com" />
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                        <link
                        href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=swap"
                        rel="stylesheet" />
                        <style>
                        html {
                            height: 100%;
                        }
                        body {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            font-family: "Instrument Sans", sans-serif;
                        }
                        .content {
                            top: 0;
                            margin: 0 auto;
                            width: 90%;
                            height: 100vh;
                            background-color: #f2f4f8;
                        }
                        .logo {
                            position: absolute;
                            bottom: 0;
                            right: 0;
                            margin: 10px;
                            width: 150px;
                            margin-right: 50px;
                        }
                            h1 {
                            color: #22b5a0;
                            padding: 30px 5px;
                            }
                            h3 {
                            text-align: center;
                            }
                            section {
                            padding: 5px 50px;
                            }
                            p {
                            text-align: justify;
                            color: #666 !important;
                            font-family: "Instrument Sans", sans-serif;
                            }
                            hr {
                            border: 1px solid #eee;
                        }
                        </style>
                    </head>
                    <body>
                        <div class="content">
                        <h1 style="text-align: center">
                            !Hemos Recibido un Nuevo Comentario!!! 
                            <hr />
                        </h1>

                        <section>
                            <h3>
                            Este correo electrónico fue enviado por ${nombre} ${apellido}.
                            </h3>
                            <p>
                            ${comentarios}
                            </p>
                            <br />
                            <h3>${email}</h3>
                        </section>
                        </div>
                    </body>
                    </html>`
        })
        res.status(200).send({
            message: 'Comentario enviado',
            data: values.length,
            data: values
        })
    } catch(e) { 
        getError500('Error al realizar la peticion', e, res);
    }
}

const putStateContact = async (req, res) => {
    try { 
        const contacto = await Contacto.findOne({where:{ contactoId: req.params.id}});
        if (!contacto) { return getDataError400(`El contacto con el id ${req.params.id} no existe`, res); }
        const [updateEstado] = await Contacto.update({estado: contacto.estado === 1 ? 0 : 1}, {where: { contactoId: req.params.id}});
        if (updateEstado === 0) { return getDataError400('error en la actualizacion del contacto!', res); }
        res.status(200).json({
            message: 'Estado del contacto cambiado correctamente',
            results: contacto,
            contacto_id: req.params.id
        });
    } catch(e) { 
        getError500('Error al realizar la petición', e, res); 
    }
}

const sendEmail = async (req, res) => {
};

const updateResponse = async (req, res) => {
    const { id } = req.params;
    const { respuesta } = req.body;
    try { 
        const contacto = await Contacto.findOne({where: {contactoId: id}});
        if (!contacto) { return getDataError400(`El contacto con el id ${id} no existe`, res); }
        const [contactoUpdate] = await Contacto.update(
            {respuesta: respuesta}, {where: { contactoId: id}} );
        if (contactoUpdate === 0) { return getDataError400('Error al actualizar la respuesta en la base de datos', res); }
        try {
            await transporter.sendMail({
                from: process.env.GG_EMAIL,
                to: contacto.email,
                replyTo: process.env.GG_EMAIL,
                subject: 'Respuesta a tu comentario',
                text: `Hola ${contacto.nombre},\n\n${respuesta}`,
                html: `
            <html lang="en">

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Respuesta a tu Comentario</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: gray;
                            margin: 0;
                            padding: 0;
                            color: #fff;
                        }
                        .email-container {
                            background-color: #050133;
                            margin: 30px auto;
                            text-align: center;
                            color: #fff;
                            width: 80%;
                            padding: 20px;
                            border-radius: 8px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            background-color:#de5302 ;
                            color: #fff;
                            padding: 10px;
                            text-align: center;                            
                            border-radius: 8px 8px 0 0;
                        }
                        .content {
                            font-size: 16px;
                            color: #fff;
                        }
                        .content p {
                            color: #fff;
                        }
                        .response {
                            background-color: #de5302;
                            color: #fff;
                            padding: 10px;
                            text-align: center;
                            border-radius: 5px;
                        }
                        .footer {
                            text-align: center;
                            font-size: 14px;
                            color: #fff;
                            margin-top: 30px;
                        }
                        .footer a {
                            color: #fff;
                            text-decoration:underline;
                        }
                        .footer a:hover {
                            text-decoration: underline;
                            color:#de5302;
                        }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="header">
                            <h2>Respuesta a tu comentario</h2>
                        </div>
                        <div class="content">
                            <p>Hola ${contacto.nombre},</p>
                            <p>Gracias por ponerte en contacto con nosotros. A continuación, te compartimos nuestra respuesta:</p>
                            <div class="response">
                                <p>${respuesta}</p>
                            </div>
                            <p>Esperamos que esta información te haya sido útil. Si tienes más dudas, no dudes en escribirnos.</p>
                        </div>
                        <div class="footer">
                            <p>Saludos cordiales,<br>El equipo de atención al cliente</p>
                            <p><a href="mailto:${process.env.GG_EMAIL}">Contacta con nosotros</a></p>
                        </div>
                    </div>
                </body>
            </html> `
            });
            res.status(200).json({
                message: 'Respuesta actualizada y correo enviado correctamente',
                contacto_id: id,
                respuesta
            });
        } catch (emailError) {
            getError500('Respuesta actualizada, pero hubo un error al enviar el correo electrónico', emailError, res);
        }
    } catch(e) { 
        getError500('Error al realizar la petición', e, res);
    }
};

const obtenerTotales = async (req, res) => {
    try { 
        const [results, metadata] = await sequelize.query(`
        SELECT
          (SELECT COUNT(*) FROM solicitudes_retiro) AS total,
          (SELECT COUNT(*) FROM solicitudes_retiro WHERE estado = 1) AS activos,
          (SELECT COUNT(*) FROM solicitudes_retiro WHERE estado = 0) AS inactivos;
          `);
        if (!results[0]) {return getDataError400('Error al obtener los totales', res); }
        getResponse200WithData('Datos obtenidos!', results[0], res);
    } catch(e) { 
        getError500('Error al obtener los totales', e, res);
    }
};


router.get('/', getContact);
router.post('/', postContact);
router.put('/stateContact/:id', putStateContact);
router.post('/sendEmail/:id', sendEmail);
router.put('/response/:id', updateResponse);
router.get('/obtenerTotales', obtenerTotales);


export default router;