
CREATE TABLE `ajustes` (
  `ajuste_id` int NOT NULL AUTO_INCREMENT,
  `comision_fija_ganancia` decimal(10,2) DEFAULT NULL,
  `comision_porcentual_ganancia` decimal(5,2) DEFAULT NULL,
  `comision_fija_retiro` decimal(10,2) DEFAULT NULL,
  `comision_porcentual_retiro` decimal(5,2) DEFAULT NULL,
  `tiempo_minimo_inversion` int DEFAULT NULL,
  `tiempo_maximo_inversion` int DEFAULT NULL,
  `sancion_porcentual_retraso` decimal(5,2) DEFAULT NULL,
  `estado` tinyint NOT NULL DEFAULT '1',
  `valor_token` decimal(10,2) DEFAULT NULL,
  `admin_id` int DEFAULT NULL,
  `image1` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image2` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image3` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `textHome` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `partners` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `propositoText` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `proposito_imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_moneda` char(50) COLLATE utf8mb4_unicode_ci DEFAULT 'USDT',
  PRIMARY KEY (`ajuste_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `categoria_personas` (
  `categoria_persona_id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `monto_minimo_inversion` int DEFAULT '0',
  `monto_maximo_inversion` int DEFAULT '0',
  `porcentaje_interes` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`categoria_persona_id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `comentarios` (
  `id_comentarios` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `inversor_id` int DEFAULT NULL,
  `comentario` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `respuesta` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `calificacion` int DEFAULT '0',
  `estado` enum('Aprobado','Rechazado') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Aprobado',
  PRIMARY KEY (`id_comentarios`),
  KEY `fk_cliente_id_idx` (`cliente_id`),
  KEY `fk_inversor_id_idx` (`inversor_id`),
  CONSTRAINT `fk_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inversor_id` FOREIGN KEY (`inversor_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `contacto` (
  `contacto_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comentarios` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `respuesta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`contacto_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `experiencia` (
  `experiencia_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `institucion` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cargo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `actividades` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_final` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`experiencia_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `experiencia_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `informacion` (
  `info_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `ocupacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `monto_inversion` int DEFAULT NULL,
  `cantidad_maxima_inversiones` int DEFAULT NULL,
  `preparacion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estudios` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `vision` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `video` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `inversion_control` int DEFAULT '0',
  PRIMARY KEY (`info_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `informacion_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `informacion_inversionista` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_inversionista` int DEFAULT NULL,
  `nombre_completo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dni` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo_dni` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domicilio` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ciudad` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `situacion_laboral` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fuente_de_ingresos` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen_selfie` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `imagen_pasaporte_anv` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `imagen_pasaporte_rev` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `FK_idinversionista` (`id_inversionista`),
  CONSTRAINT `FK_idinversionista` FOREIGN KEY (`id_inversionista`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `inversiones` (
  `inversion_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `inversor_id` int DEFAULT NULL,
  `monto` int DEFAULT '0',
  `tipo_ganancia` enum('Monto fijo','Porcentual') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ganancia_estimada` decimal(10,2) DEFAULT NULL,
  `fecha_deposito` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `solicitud_inv_id` int DEFAULT NULL,
  PRIMARY KEY (`inversion_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `inversor_id` (`inversor_id`),
  KEY `solicitud_inv_id` (`solicitud_inv_id`),
  CONSTRAINT `inversiones_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `inversiones_ibfk_2` FOREIGN KEY (`inversor_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `inversiones_ibfk_3` FOREIGN KEY (`solicitud_inv_id`) REFERENCES `solicitudes_inversion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `links` (
  `link_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`link_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `links_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `logros` (
  `logro_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`logro_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `logros_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `movimientos` (
  `movimiento_id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('Ingreso','Egreso') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT '0.00',
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `fecha_solicitud` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_desembolso` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `inversiones_id` int DEFAULT NULL,
  `solicitudes_retiro_id` int DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `token` decimal(10,2) DEFAULT '0.00',
  `movimientoscol` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`movimiento_id`),
  KEY `inversiones_id` (`inversiones_id`),
  KEY `solicitudes_retiro_id` (`solicitudes_retiro_id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `inversiones_id` FOREIGN KEY (`inversiones_id`) REFERENCES `inversiones` (`inversion_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `solicitudes_retiro_id` FOREIGN KEY (`solicitudes_retiro_id`) REFERENCES `solicitudes_retiro` (`retiro_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usuario_id` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=506 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `plan_pagos` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `solicitud_inv_id` int NOT NULL,
  `cliente_id` int NOT NULL,
  `num_pago` int NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `fecha_programada` date NOT NULL,
  `estado_pago` enum('Pendiente','Pagado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pendiente',
  `fecha_pagada` date DEFAULT NULL,
  PRIMARY KEY (`plan_id`),
  KEY `fk_solicitud_inv` (`solicitud_inv_id`),
  KEY `fk_cliente_plan` (`cliente_id`),
  CONSTRAINT `fk_cliente_plan` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `fk_solicitud_inv` FOREIGN KEY (`solicitud_inv_id`) REFERENCES `solicitudes_inversion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen_portada` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contenido` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` enum('Activo','Inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Inactivo',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `respuesta` (
  `respuesta_id` int NOT NULL,
  `comentario_id` int DEFAULT NULL,
  `inversor_id` int DEFAULT NULL,
  `respuesta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`respuesta_id`),
  KEY `fk_comentario_idx` (`comentario_id`),
  CONSTRAINT `fk_comentario_idx` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id_comentarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `solicitudes_inversion` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int NOT NULL DEFAULT '0',
  `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '0',
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_inicio_recaudacion` date NOT NULL,
  `fecha_fin_recaudacion` date NOT NULL,
  `monto` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cantidad_pagos` int NOT NULL DEFAULT '0',
  `fecha_inicio_pago` date NOT NULL,
  `fecha_fin_pago` date NOT NULL,
  `aprobado` enum('Pendiente','Aprobado','Rechazado') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Pendiente',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `observaciones` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `estado_inversion` enum('Inicial','Pendiente','Proceso','Finalizado','Reversion') COLLATE utf8mb4_general_ci DEFAULT 'Inicial',
  `porcentaje_interes` decimal(5,2) DEFAULT '0.00',
  `canceladoPor` varchar(255) COLLATE utf8mb4_general_ci DEFAULT 'Admin',
  PRIMARY KEY (`id`),
  KEY `si_cliente_id` (`cliente_id`) USING BTREE,
  CONSTRAINT `si_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


CREATE TABLE `solicitudes_retiro` (
  `retiro_id` int NOT NULL AUTO_INCREMENT,
  `tipo` enum('cliente','inversor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `usuario_id` int DEFAULT NULL,
  `monto_solicitud` decimal(10,2) DEFAULT '0.00',
  `tokens_cambio` decimal(10,2) DEFAULT '0.00',
  `comision_aplicar` decimal(5,2) DEFAULT '0.00',
  `monto_recibir` decimal(10,2) DEFAULT '0.00',
  `fecha_solicitud` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_aprobacion` date DEFAULT NULL,
  `foto_identificacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `selfie_identificacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` enum('Pagado','Pendiente','Aprobado','Rechazado','Eliminado') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pendiente',
  `inversion_id` int DEFAULT NULL,
  PRIMARY KEY (`retiro_id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `inversion_id` (`inversion_id`),
  CONSTRAINT `solicitudes_retiro_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `solicitudes_retiro_ibfk_2` FOREIGN KEY (`inversion_id`) REFERENCES `inversiones` (`inversion_id`)
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


CREATE TABLE `usuarios` (
  `usuario_id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apellido` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `correo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo_pais` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `numero_telefono` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pais_residencia` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `edad` int DEFAULT NULL,
  `acepta_terminos` tinyint(1) DEFAULT NULL,
  `categoria_persona_id` int DEFAULT NULL,
  `rol` enum('Inversionista','Cliente','Admin','Null') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `cod_verificacion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `verificado` tinyint(1) NOT NULL DEFAULT '0',
  `saldo_total` decimal(10,2) DEFAULT '0.00',
  `registrado_por` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aprobado` tinyint(1) DEFAULT '0',
  `resetPasswordToken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetPasswordExpires` bigint DEFAULT NULL,
  `genero` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `porcentaje_registro` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '0%',
  PRIMARY KEY (`usuario_id`),
  UNIQUE KEY `correo` (`correo`),
  UNIQUE KEY `numero_telefono` (`numero_telefono`),
  KEY `categoria_persona_id` (`categoria_persona_id`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`categoria_persona_id`) REFERENCES `categoria_personas` (`categoria_persona_id`)
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci