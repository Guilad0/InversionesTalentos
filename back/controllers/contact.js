const { response: res, request: req } = require('express')
const conexion = require('../database');

const transporter = require('../helpers/mailer');

const getContact = (req, res) => {
    let sql = 'select * from contacto';
    conexion.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                error
            });
        } else {
            res.status(200).json({
                results,
                cant: results.length
            });
        }
    });
}
const postContact = async (req, res) => {
    const { nombre, apellido, email, telefono, comentarios } = req.body;
    const sql = `INSERT INTO contacto(nombre, apellido, email, telefono, comentarios,estado) VALUES (?, ?, ?, ?, ?, 0)`;
    let values = [nombre, apellido, email, telefono, comentarios]

    conexion.query(sql, values, async (error) => {
        if (error) {
            res.status(500).json({
                message: 'Error al realizar la peticion',
                error: error.message
            })
        } else {

            try {
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

            } catch (mailError) {
                res.status(500).send({
                    message: 'Error al enviar el email',
                    error: mailError.message
                })


            }
        }
    });

}
const putStateContact = async (req, res) => {
    let sql = `select * from contacto where contacto_id=${req.params.id}`;
    conexion.query(sql, (error, results) => {
        if (error) {
            res.status(500).json({
                message: 'Error al realizar la peticion',
                error: error.message
            })
        } else {
            if (results.length == 0) {
                res.status(500).json({
                    message: `El contacto con el id ${req.params.id} no existe`,
                })

            }
            else {
                let sql2 = `update contacto set estado = !estado where contacto_id = ?`;
                let values = [req.params.id];
                conexion.query(sql2, values, (error) => {
                    if (error) {
                        res.status(500).send({
                            message: 'Error al realizar la peticion',
                            error: error.message
                        })
                    } else {
                        res.status(200).send({
                            message: 'Estado contacto cambiado',
                            data: values.length,
                            data: values

                        })

                    }
                })
            }
        }
    });

}

const sendEmail = async (req, res) => {

}

module.exports = {
    getContact,
    postContact,
    putStateContact,
    sendEmail
}
