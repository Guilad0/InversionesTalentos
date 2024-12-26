-- --------------------------------------------------------
-- Host:                         autorack.proxy.rlwy.net
-- Versión del servidor:         9.1.0 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para railway
CREATE DATABASE IF NOT EXISTS `railway` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `railway`;

-- Volcando estructura para tabla railway.ajustes
CREATE TABLE IF NOT EXISTS `ajustes` (
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
  PRIMARY KEY (`ajuste_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `admin_id` FOREIGN KEY (`admin_id`) REFERENCES `usuarios` (`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.ajustes: ~1 rows (aproximadamente)
INSERT INTO `ajustes` (`ajuste_id`, `comision_fija_ganancia`, `comision_porcentual_ganancia`, `comision_fija_retiro`, `comision_porcentual_retiro`, `tiempo_minimo_inversion`, `tiempo_maximo_inversion`, `sancion_porcentual_retraso`, `estado`, `valor_token`, `admin_id`, `image1`, `image2`, `image3`, `textHome`, `partners`, `propositoText`, `proposito_imagen`, `video`, `logo`, `nombre`) VALUES
	(6, NULL, 5.00, NULL, 4.00, 3, 3, NULL, 1, 300.00, 23, 'https://res.cloudinary.com/dbvzafbum/image/upload/v1734023774/home/image1.png', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1734023791/home/image2.png', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1734024034/home/image3.png', 'Queremos ayudar a todos los talentos profesionales en áreas como la ingeniería, tecnología y más, a desarrollar sus carreras, aprovechando el apoyo financiero de todos sus seguidores y entusiastas.', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1734019144/home/partners.png', 'Ser el aliado líder en el crecimiento financiero de nuestros clientes, ofreciendo soluciones de inversión innovadoras, seguras y responsables, que generen valor sostenible en el tiempo. Aspiramos a transformar la industria de inversiones mediante el uso de tecnología avanzada, transparencia y compra', 'https://res.cloudinary.com/dpb4sg7pc/image/upload/v1732722280/home/proposito_imagen.png', 'https://www.youtube.com/watch?v=aO5GKcWe-FA', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732894553/home/logo.png', 'Slice2.0');

-- Volcando estructura para tabla railway.categoria_personas
CREATE TABLE IF NOT EXISTS `categoria_personas` (
  `categoria_persona_id` int NOT NULL AUTO_INCREMENT,
  `imagen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `monto_minimo_inversion` int DEFAULT '0',
  `monto_maximo_inversion` int DEFAULT '0',
  PRIMARY KEY (`categoria_persona_id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.categoria_personas: ~7 rows (aproximadamente)
INSERT INTO `categoria_personas` (`categoria_persona_id`, `imagen`, `nombre`, `estado`, `monto_minimo_inversion`, `monto_maximo_inversion`) VALUES
	(16, '983e1d00-0170-4039-80a7-d70a8ed525da.png', 'Sin categoria ', 1, 0, 0),
	(18, 'c09ad69e-3191-4065-b46b-3b36099bd487.jpg', 'Desarrollo de software Backend', 1, 0, 0),
	(19, '33dfdf61-c8ef-43af-aa34-8a11e5a89e11.png', 'Diseño Gráfico', 1, 1000, 5000),
	(20, '2a01efb4-5ed5-43af-9a14-c83a935a56e3.png', 'Desarrollo de software Frontend', 1, 0, 0),
	(26, '7a4a1fe7-366e-42f3-a748-62fc7a23a0d0.png', 'Arquitectura ', 0, 0, 0),
	(47, '4d02bfa3-e79c-44e4-af8b-9f4207751ca0.jpg', 'Ingeniería', 1, 5000, 20000),
	(54, '586b55a9-02e2-4429-9992-4c03ca1a4390.jpg', 'Diseño Gráfico 2', 1, 100, 10000);

-- Volcando estructura para tabla railway.comentarios
CREATE TABLE IF NOT EXISTS `comentarios` (
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.comentarios: ~0 rows (aproximadamente)

-- Volcando estructura para tabla railway.contacto
CREATE TABLE IF NOT EXISTS `contacto` (
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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.contacto: ~7 rows (aproximadamente)
INSERT INTO `contacto` (`contacto_id`, `nombre`, `apellido`, `email`, `telefono`, `comentarios`, `respuesta`, `estado`, `created_at`, `updated_at`) VALUES
	(39, 'Victor Hugo', 'Sejas Burgoa', 'victorhugo31103@gmail.com', '31231', '33', '', 0, '2024-11-25 16:29:39', '2024-11-25 16:29:39'),
	(40, 'Victor Hugo', 'Sejas Burgoa', 'victorhugo31103@gmail.com', '1q21', '13', NULL, 0, '2024-11-26 13:52:17', '2024-11-26 13:52:17'),
	(41, 'Victor Hugo', 'Sejas Burgoa', 'victorhugo31103@gmail.com', '2', 'd', NULL, 0, '2024-11-26 14:09:35', '2024-11-26 14:09:35'),
	(42, 'fdsfds', 'fdsfds', 'fdsfds@fdsafds.com', 'fdfdsfdsfdsfds', '', 'respondido', 1, '2024-11-26 14:33:35', '2024-11-26 14:33:35'),
	(43, 'Victor Hugo', 'Sejas Burgoa', 'victorhugo31103@gmail.com', 'eqwe', 'qweqwe', NULL, 0, '2024-11-27 03:04:57', '2024-11-27 03:04:57'),
	(44, 'Victor Hugo', 'Sejas Burgoa', 'victorhugo31103@gmail.com', '14', 'p', NULL, 0, '2024-11-27 13:52:15', '2024-11-27 13:52:15'),
	(45, 'Aute doloribus non l', 'Facilis eos quod aut', 'pygo@mailinator.com', '+1 (181) 745-3211', 'Duis placeat volupt', 'respondido', 0, '2024-11-27 21:18:01', '2024-11-27 21:18:01');

-- Volcando estructura para tabla railway.experiencia
CREATE TABLE IF NOT EXISTS `experiencia` (
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
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.experiencia: ~9 rows (aproximadamente)
INSERT INTO `experiencia` (`experiencia_id`, `cliente_id`, `institucion`, `cargo`, `actividades`, `fecha_inicio`, `fecha_final`, `estado`) VALUES
	(33, 145, NULL, NULL, NULL, '2023-02-25', NULL, 1),
	(34, 144, 'Unibienes', 'Analista de Desarrollo', 'Desarrollo full Stack', '2024-11-01', '2024-11-22', 1),
	(35, 149, NULL, NULL, NULL, '2022-10-10', NULL, 1),
	(36, 151, NULL, NULL, NULL, '2021-01-01', NULL, 1),
	(37, 153, NULL, NULL, NULL, '1992-01-01', NULL, 1),
	(38, 159, NULL, NULL, NULL, '2024-11-26', NULL, 1),
	(39, 144, NULL, NULL, NULL, '2024-11-04', NULL, 1),
	(41, 139, 'Numquam quis optio', 'Tempore autem ut qu', 'Laborum Sed tempora', '1987-01-25', '1991-10-06', 1),
	(42, 166, 'Quas fugit do ipsum', 'Natus voluptatibus e', 'Autem eligendi sint', '2002-10-16', '2005-12-15', 1);

-- Volcando estructura para tabla railway.faq
CREATE TABLE IF NOT EXISTS `faq` (
  `faq_id` int NOT NULL AUTO_INCREMENT,
  `pregunta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `respuesta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`faq_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.faq: ~13 rows (aproximadamente)
INSERT INTO `faq` (`faq_id`, `pregunta`, `respuesta`, `estado`, `created_at`, `updated_at`) VALUES
	(2, ' ¿Qué es “Hamilo Inversiones”?', ' <p> <b>Hamilo Inversiones</b> es una plataforma en la que inversionistas pueden apoyar a talentos y profesionales en diversos sectores, invirtiendo en sus carreras y proyectos a cambio de una parte de sus futuras ganancias (dividendos), además de formar parte de una comunidad exclusiva junto a estos talentos. </p>', 1, '2024-10-22 20:03:48', '2024-11-28 20:35:45'),
	(3, '¿Qué significa forma parte de los inversionistas?', '<p>Esto significa que los inversionistas que compren tokens de un deportista o profesional podrán acceder a beneficios, contenido exclusivo y experiencias especiales que estos elijan ofrecer a su comunidad. Sin embargo, esto depende completamente de cada deportista o profesional, ya que la compra de un token o suscripción no los obliga a ofrecer beneficios adicionales.</p>', 1, '2024-10-22 20:05:23', '2024-11-25 05:16:13'),
	(4, '¿Cómo funciona?', '<p> Cuando talentos y profesionales se registran en nuestra plataforma, establecen el valor inicial de sus tokens. Las ganancias se generan a través de las inversiones realizadas por los inversionistas. </p> <p> Los inversionistas pueden adquirir estos tokens y, al hacerlo, invierten directamente en los talentos y profesionales. Los fondos recaudados se destinan exclusivamente al desarrollo de sus carreras o proyectos, especialmente en las etapas iniciales. Durante este período, los talentos y profesionales deben emplear los recursos únicamente para cubrir gastos relacionados con sus objetivos. </p> <p> A cambio, los inversionistas reciben un porcentaje de las ganancias futuras generadas por los talentos y profesionales, conocido como dividendos. <b>Hamilo Inversiones</b> facilita este proceso notificando a los talentos y profesionales sobre la devolución de los tokens y auditando el uso adecuado de los fondos. </p> <p> Para participar y reclamar tanto los tokens como los dividendos, los inversionistas deben estar registrados en nuestra plataforma. </p>', 1, '2024-10-22 20:05:51', '2024-11-28 20:57:24'),
	(6, '¿Con que frecuencia tiene lugar la distribución? ', '<p> <b>Hamilo Inversiones</b> recaudará mensualmente y anualmente el dinero del premio de cada deportista o profesional y distribuirá los dividendos a la billetera <b>Hamilo Inversiones</b> del titular del token. </p>', 1, '2024-10-22 20:07:22', '2024-11-28 20:57:50'),
	(7, 'Desde el punto de vista de un inversor ¿Por qué comprar un token a un profesional o jugador junior?', '<p>Desde el punto de vista de un inversionista, la razón para comprar un token de un deportista o profesional junior es la oportunidad de participar en el crecimiento y éxito de su carrera o proyecto a largo plazo. Al invertir en un token, el inversionista no solo respalda financieramente a un profesional o deportista emergente, sino que también tiene la posibilidad de recibir un porcentaje de sus futuras ganancias (dividendos), que provienen de premios, ingresos o ingresos generados por el éxito del profesional.</p>', 1, '2024-10-22 20:07:51', '2024-11-25 05:20:13'),
	(8, '¿Cómo reclamo mis dividendos?', '<p>Los usuarios que hayan completado su validación de identidad podrán reclamar sus dividendos, los cuales se sumarán a su balance.</p>', 1, '2024-10-22 20:08:14', '2024-11-25 05:20:44'),
	(9, '¿Qué parte de los ingresos comparte el talento o profesional?', '<p>El porcentaje de las ganancias que se destina a los inversionistas es determinado por cada talento o profesional, en función del valor que asignen a su token.</p>', 1, '2024-10-22 20:09:20', '2024-11-28 20:59:09'),
	(10, '¿Cómo puedo comprar un token?', '<p> Para comprar un token, primero debes registrarte en <b>Hamilo Inversiones</b>. Una vez registrado, podrás acceder a tu billetera en la plataforma para adquirir tokens y recargarla. Posteriormente, podrás utilizar estos fondos para invertir en talentos y profesionales, apoyando el desarrollo de sus carreras o proyectos. </p>', 1, '2024-10-22 20:09:44', '2024-11-28 20:58:25'),
	(11, '¿Puedo enviar una oferta personalizada a cualquier jugador? ', '<p>Sí, puedes enviar una oferta personalizada a cualquier talento o profesional, siempre y cuando cumpla con el requisito de una compra mínima de 700 tokens y un máximo de 5000 tokens, según el valor establecido para el token.</p>', 1, '2024-10-22 20:10:08', '2024-11-25 05:22:21'),
	(12, '¿Cómo puedo fondear mi billetera?', '<p>Añadiendo fondos Dólares (Usd) utilizando cualquier método de pago como se muestra en el proceso de pago.</p>', 1, '2024-10-22 20:10:30', '2024-11-25 05:22:50'),
	(14, '¿Cómo puedo conocer a los talentos o profesionales?', '<p>Puedes acceder al perfil oficial del talento o profesional a través de nuestra página web. Además, te animamos a que los sigas en sus redes sociales, donde publican regularmente diferentes noticias, actualizaciones y contenidos de todos sus logros y proyectos.</p>', 1, '2024-10-22 20:11:17', '2024-11-25 05:23:55'),
	(15, 'Desde el punto de vista de un inversor, ¿Por qué comprar un token a un talento o profesional experimentado?', '<p>Adquirir un token de un talento o profesional experimentado representa una atractiva oportunidad de inversión debido a su historial comprobado de éxito. Estos talentos y profesionales suelen contar con una carrera establecida, lo que incrementa la probabilidad de generar ganancias futuras sostenibles a través de premios, patrocinios o proyectos relacionados con su trayectoria.</p>', 1, '2024-10-22 20:11:42', '2024-11-25 05:25:32'),
	(27, ' ', ' ', 1, '2024-11-26 14:34:48', '2024-11-26 14:34:48');

-- Volcando estructura para tabla railway.informacion
CREATE TABLE IF NOT EXISTS `informacion` (
  `info_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `ocupacion` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `monto_inversion` decimal(10,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.informacion: ~8 rows (aproximadamente)
INSERT INTO `informacion` (`info_id`, `cliente_id`, `ocupacion`, `descripcion`, `monto_inversion`, `cantidad_maxima_inversiones`, `preparacion`, `estudios`, `vision`, `estado`, `video`, `imagen`, `inversion_control`) VALUES
	(13, 149, 'Ingeniero de software', 'Soy un ingeniero de software con [número de años] años de experiencia en el diseño y desarrollo de aplicaciones web y móviles. Mi enfoque principal es crear soluciones tecnológicas eficientes, escalables y centradas en el usuario', 200.00, 1000, 'Título Universitario: Ingeniero en Sistemas de Información Universidad [Nombre de la Universidad] | [Año de finalización] Formación sólida en fundamentos de programación, estructuras de datos, bases de datos, ingeniería de software y redes informáticas.', 'Ingeniería en Sistemas de Información Universidad [Nombre de la Universidad] [Años de estudio, ej. 2018 - 2023]', 'Mi visión es ser un líder en el desarrollo de soluciones tecnológicas innovadoras que impacten positivamente en la vida de las personas y las operaciones de las empresas. Aspiro a crear software eficiente, escalable y accesible, mientras contribuyo al avance de la industria tecnológica mediante el aprendizaje continuo y la colaboración en proyectos de alto impacto.\n\nCreo en el poder de la tecnología para transformar realidades, y mi objetivo es formar parte de equipos que valoren la creatividad, la calidad y el enfoque en el usuario. Mi meta a largo plazo es combinar habilidades técnicas con liderazgo para guiar iniciativas que impulsen el cambio y el crecimiento sostenible.', 1, '4fc1bddb-5837-40cc-8dd5-ce2a1ade7140.mp4', NULL, 0),
	(14, 144, 'Ingeniero de Sistemas', 'Dedicado al Desarrollo Web con experiencia de 1 año', 20.00, 1000, 'Ingeniero ', 'Universidad', 'Aperturar empresa de desarrollo', 1, 'a1bc6f7b-7513-4eff-a932-a33d83b90d88.mp4', NULL, 0),
	(15, 151, 'estudiante', 'asd', 500.00, 90000, 'asd', 'tec', 'futuro', 1, 'e5b43861-202c-492b-83bc-c2560071fdff.mp4', NULL, 0),
	(17, 153, 'Hacker', 'Ciberseguridad', 200.00, 1000, 'Berlin College', 'Ciberseguridad', 'Controlar y/o erradicar la pirateria', 1, NULL, NULL, 0),
	(21, 159, ' ', '  ', 0.00, 0, ' ', ' ', ' ', 1, NULL, NULL, 0),
	(22, 139, 'Nobis sunt qui deser', 'Sed enim amet ad au', 10.00, 100, 'Consectetur temporib', 'Labore consectetur s', 'Reprehenderit velit', 1, NULL, NULL, 0),
	(23, 166, 'Ipsa in dolores ill', 'Qui sit do enim fug', 50.00, 500, 'Non incididunt esse', 'Quo autem accusantiu', 'Tempora est nihil ma', 1, 'video', NULL, 0),
	(27, 168, 'Desarrollador', 'Desarrollador de software', 10000.00, 5, 'Licenciatura en Ciencias de la Computación', 'Universidad XYZ', 'Crear soluciones innovadoras', 1, NULL, NULL, 0);

-- Volcando estructura para tabla railway.informacion_inversionista
CREATE TABLE IF NOT EXISTS `informacion_inversionista` (
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.informacion_inversionista: ~5 rows (aproximadamente)
INSERT INTO `informacion_inversionista` (`id`, `id_inversionista`, `nombre_completo`, `dni`, `tipo_dni`, `domicilio`, `ciudad`, `situacion_laboral`, `fuente_de_ingresos`, `imagen_selfie`, `imagen_pasaporte_anv`, `imagen_pasaporte_rev`) VALUES
	(13, 148, 'Alex', '6666666', 'ci', 'Tangamandapio', 'La Paz', 'Independiente', 'Comercio', NULL, NULL, NULL),
	(14, 140, 'Brian', '123456', 'ci', 'One Piece', 'Grand Blue', 'Independiente', 'Pirata', NULL, NULL, NULL),
	(15, 160, 'leo', '  ', 'ci', ' ', ' ', '', ' ', NULL, NULL, NULL),
	(16, 161, 'leo', 'fdsfd1212', 'pasaporte', '  ', '  ', '', '  ', NULL, NULL, NULL),
	(17, 143, 'juan', '789789789', 'ci', 'calle aroma', 'Cercado', 'Independiente', 'Autonomo', NULL, NULL, NULL);

-- Volcando estructura para tabla railway.inversiones
CREATE TABLE `inversiones` (
  `inversion_id` int NOT NULL AUTO_INCREMENT,
  `solicitud_inv_id` int NOT NULL,
  `cliente_id` int DEFAULT NULL,
  `inversor_id` int DEFAULT NULL,
  `monto` int DEFAULT '0',
  `tipo_ganancia` enum('Monto fijo','Porcentual') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ganancia_estimada` decimal(10,2) DEFAULT NULL,
  `fecha_deposito` date DEFAULT NULL,
  `fecha_devolucion` date DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`inversion_id`),
  KEY `cliente_id` (`cliente_id`),
  KEY `inversor_id` (`inversor_id`),
  KEY `solicitud_inv_id` (`solicitud_inv_id`),
  CONSTRAINT `inversiones_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `inversiones_ibfk_2` FOREIGN KEY (`inversor_id`) REFERENCES `usuarios` (`usuario_id`),
  CONSTRAINT `inversiones_ibfk_3` FOREIGN KEY (`solicitud_inv_id`) REFERENCES `solicitudes_inversion` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci

-- Volcando datos para la tabla railway.inversiones: ~12 rows (aproximadamente)
INSERT INTO `inversiones` (`inversion_id`, `cliente_id`, `inversor_id`, `monto`, `tipo_ganancia`, `ganancia_estimada`, `fecha_deposito`, `fecha_devolucion`, `estado`, `solicitud_inv_id`) VALUES
	(122, 149, 140, 200.00, NULL, 210.00, '2024-11-24', '2025-02-25', 1, NULL),
	(123, 149, 140, 1000.00, NULL, 1050.00, '2024-11-25', '2025-02-25', 1, NULL),
	(124, 145, 140, 1000.00, NULL, 1050.00, '2024-11-25', '2025-02-25', 1, NULL),
	(125, 151, 148, 50000.00, NULL, 52500.00, '2024-11-25', '2025-02-25', 1, NULL),
	(126, 145, 148, 2000.00, NULL, 2100.00, '2024-11-25', '2025-02-25', 1, NULL),
	(127, 149, 161, 1000.00, NULL, 1050.00, '2024-11-26', '2025-02-26', 1, NULL),
	(128, 149, 140, 800.00, NULL, 840.00, '2024-11-26', '2025-02-26', 1, NULL),
	(129, 149, 140, 1000.00, NULL, 1050.00, '2024-11-26', '2025-02-26', 1, NULL),
	(130, 149, 143, 300.00, NULL, 315.00, '2024-11-26', '2025-02-26', 1, NULL),
	(131, 145, 140, 800.00, NULL, 840.00, '2024-11-26', '2025-02-26', 1, NULL),
	(132, 145, 143, 600.00, NULL, 630.00, '2024-11-27', '2025-02-27', 1, NULL),
	(133, 144, 143, 500.00, NULL, 525.00, '2024-11-27', '2025-02-27', 1, NULL),
	(134, 149, 143, 200.00, NULL, 210.00, '2024-12-13', '2025-03-13', 1, NULL),
	(135, 149, 143, 800.00, NULL, 840.00, '2024-12-13', '2025-03-13', 1, 1);

-- Volcando estructura para tabla railway.links
CREATE TABLE IF NOT EXISTS `links` (
  `link_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `nombre` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`link_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `links_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.links: ~0 rows (aproximadamente)

-- Volcando estructura para tabla railway.logros
CREATE TABLE IF NOT EXISTS `logros` (
  `logro_id` int NOT NULL AUTO_INCREMENT,
  `cliente_id` int DEFAULT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`logro_id`),
  KEY `cliente_id` (`cliente_id`),
  CONSTRAINT `logros_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.logros: ~13 rows (aproximadamente)
INSERT INTO `logros` (`logro_id`, `cliente_id`, `descripcion`, `estado`, `fecha`) VALUES
	(29, 145, 'Concurso de Traviesos', 1, '2024-11-14 00:00:00'),
	(30, 149, 'Desarrollé y optimicé una aplicación web en Vue.js que mejoró la experiencia del usuario, logrando un aumento del 30% en la retención de usuarios durante los primeros tres meses de implementación.', 1, '2024-10-10 00:00:00'),
	(31, 144, 'Especialidad en desarrollo web.', 1, '2024-11-01 00:00:00'),
	(32, 151, 'titulo', 1, '2023-01-02 00:00:00'),
	(33, 153, 'Trabaje para google para la busqueda de bulnerabilidades', 1, '1992-01-01 00:00:00'),
	(34, 144, 'Win', 1, '2002-12-14 00:00:00'),
	(35, 159, '  ', 1, '2024-11-26 00:00:00'),
	(36, 144, 'eqw', 1, '2000-03-21 00:00:00'),
	(37, 144, 'dszfhbsfhsdfhnsd', 1, '2000-02-12 00:00:00'),
	(38, 139, 'Quasi eos reprehend', 1, '2005-07-31 00:00:00'),
	(39, 139, 'Sed laudantium ipsu', 1, '2024-10-02 00:00:00'),
	(40, 139, 'Aut reprehenderit m', 1, '2024-11-01 00:00:00'),
	(41, 166, 'Asperiores amet qui', 1, '2015-04-06 00:00:00');

-- Volcando estructura para tabla railway.movimientos
CREATE TABLE IF NOT EXISTS `movimientos` (
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
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.movimientos: ~225 rows (aproximadamente)
INSERT INTO `movimientos` (`movimiento_id`, `tipo`, `monto`, `descripcion`, `fecha_solicitud`, `fecha_desembolso`, `estado`, `inversiones_id`, `solicitudes_retiro_id`, `usuario_id`, `token`, `movimientoscol`) VALUES
	(214, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-18 19:58:07', NULL, 1, NULL, NULL, 88, 2000000.00, NULL),
	(215, 'Egreso', NULL, 'Tokens invertidos', '2024-11-18 19:58:17', NULL, 1, 77, NULL, 88, 2000.00, NULL),
	(216, 'Ingreso', NULL, 'Inversión recibida', '2024-11-18 19:58:18', NULL, 1, 77, NULL, 85, 2000.00, NULL),
	(218, 'Egreso', NULL, 'Tokens invertidos', '2024-11-19 20:11:55', NULL, 1, 78, NULL, 90, 500.00, NULL),
	(219, 'Ingreso', NULL, 'Inversión recibida', '2024-11-19 20:11:55', NULL, 1, 78, NULL, 87, 500.00, NULL),
	(220, 'Ingreso', 50.00, 'Compra de tokens', '2024-11-19 20:15:07', NULL, 1, NULL, NULL, 90, 10000.00, NULL),
	(221, 'Egreso', NULL, 'Tokens invertidos', '2024-11-20 19:39:07', NULL, 1, 79, NULL, 90, 20.00, NULL),
	(222, 'Ingreso', NULL, 'Inversión recibida', '2024-11-20 19:39:08', NULL, 1, 79, NULL, 87, 20.00, NULL),
	(223, 'Egreso', NULL, 'Tokens invertidos', '2024-11-20 19:48:35', NULL, 1, 80, NULL, 90, 500.00, NULL),
	(224, 'Ingreso', NULL, 'Inversión recibida', '2024-11-20 19:48:35', NULL, 1, 80, NULL, 85, 500.00, NULL),
	(226, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-20 20:57:10', NULL, 1, NULL, NULL, 88, 20000.00, NULL),
	(227, 'Egreso', NULL, 'Tokens invertidos', '2024-11-20 20:57:23', NULL, 1, 81, NULL, 88, 1000.00, NULL),
	(228, 'Ingreso', NULL, 'Inversión recibida', '2024-11-20 20:57:24', NULL, 1, 81, NULL, 107, 1000.00, NULL),
	(230, 'Egreso', NULL, 'Tokens invertidos', '2024-11-21 15:09:52', NULL, 1, 82, NULL, 88, 12.00, NULL),
	(231, 'Ingreso', NULL, 'Inversión recibida', '2024-11-21 15:09:52', NULL, 1, 82, NULL, 87, 12.00, NULL),
	(232, 'Egreso', NULL, 'Tokens invertidos', '2024-11-21 15:10:49', NULL, 1, 83, NULL, 88, 20.00, NULL),
	(233, 'Ingreso', NULL, 'Inversión recibida', '2024-11-21 15:10:49', NULL, 1, 83, NULL, 87, 20.00, NULL),
	(235, 'Ingreso', 20.00, 'Compra de tokens', '2024-11-21 15:54:22', NULL, 1, NULL, NULL, 85, 4000.00, NULL),
	(237, 'Egreso', NULL, 'Devolucion de tokens', '2024-11-21 15:58:32', NULL, 1, 67, NULL, 85, 62.00, NULL),
	(238, 'Ingreso', NULL, 'Ganancia de tokens invertidos', '2024-11-21 15:58:33', NULL, 1, 67, NULL, 90, 62.00, NULL),
	(239, 'Egreso', NULL, 'Tokens invertidos', '2024-11-21 16:03:26', NULL, 1, 84, NULL, 88, 200.00, NULL),
	(240, 'Ingreso', NULL, 'Inversión recibida', '2024-11-21 16:03:26', NULL, 1, 84, NULL, 87, 200.00, NULL),
	(241, 'Ingreso', 15.00, 'Compra de tokens', '2024-11-22 16:31:55', NULL, 1, NULL, NULL, 88, 3000.00, NULL),
	(242, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 16:37:11', NULL, 1, 85, NULL, 88, 2000.00, NULL),
	(243, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 16:37:11', NULL, 1, 85, NULL, 87, 2000.00, NULL),
	(245, 'Ingreso', 20000.00, 'Compra de tokens', '2024-11-22 20:05:59', NULL, 1, NULL, NULL, 127, 10000000.00, NULL),
	(246, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:10:39', NULL, 1, 86, NULL, 88, 10000.00, NULL),
	(247, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:10:40', NULL, 1, 86, NULL, 85, 10000.00, NULL),
	(248, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:12:18', NULL, 1, 87, NULL, 88, 300.00, NULL),
	(249, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:12:19', NULL, 1, 87, NULL, 85, 300.00, NULL),
	(250, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:12:47', NULL, 1, 88, NULL, 88, 10000.00, NULL),
	(251, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:12:48', NULL, 1, 88, NULL, 87, 10000.00, NULL),
	(252, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:13:25', NULL, 1, 89, NULL, 88, 100.00, NULL),
	(253, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:13:26', NULL, 1, 89, NULL, 87, 100.00, NULL),
	(254, 'Ingreso', 2000.00, 'Compra de tokens', '2024-11-22 20:13:52', NULL, 1, NULL, NULL, 127, 400000.00, NULL),
	(255, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:14:29', NULL, 1, 90, NULL, 88, 200.00, NULL),
	(256, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:14:29', NULL, 1, 90, NULL, 85, 200.00, NULL),
	(257, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:15:08', NULL, 1, 91, NULL, 88, 100.00, NULL),
	(258, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:15:08', NULL, 1, 91, NULL, 107, 100.00, NULL),
	(259, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-22 20:17:46', NULL, 1, NULL, NULL, 85, 20000.00, NULL),
	(260, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:22:28', NULL, 1, 92, NULL, 88, 1000.00, NULL),
	(261, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:22:28', NULL, 1, 92, NULL, 85, 1000.00, NULL),
	(262, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 20:23:27', NULL, 1, 93, NULL, 88, 4256.00, NULL),
	(263, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 20:23:27', NULL, 1, 93, NULL, 87, 4256.00, NULL),
	(264, 'Ingreso', 5000.00, 'Compra de tokens', '2024-11-22 20:48:34', NULL, 1, NULL, NULL, 127, 1000000.00, NULL),
	(265, 'Ingreso', 10.00, 'Compra de tokens', '2024-11-22 20:49:15', NULL, 1, NULL, NULL, 127, 2000.00, NULL),
	(266, 'Ingreso', 5000.00, 'Compra de tokens', '2024-11-22 20:54:53', NULL, 1, NULL, NULL, 127, 1000000.00, NULL),
	(267, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-22 21:01:28', NULL, 1, NULL, NULL, 127, 20000.00, NULL),
	(268, 'Ingreso', 5000.00, 'Compra de tokens', '2024-11-22 21:01:39', NULL, 1, NULL, NULL, 127, 1000000.00, NULL),
	(269, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-22 21:08:59', NULL, 1, NULL, NULL, 127, 20000.00, NULL),
	(270, 'Ingreso', 10.00, 'Compra de tokens', '2024-11-22 21:11:04', NULL, 1, NULL, NULL, 127, 2000.00, NULL),
	(271, 'Ingreso', 20.00, 'Compra de tokens', '2024-11-22 21:13:09', NULL, 1, NULL, NULL, 127, 4000.00, NULL),
	(272, 'Ingreso', 20.00, 'Compra de tokens', '2024-11-22 21:15:13', NULL, 1, NULL, NULL, 127, 4000.00, NULL),
	(273, 'Ingreso', 20.00, 'Compra de tokens', '2024-11-22 21:15:43', NULL, 1, NULL, NULL, 127, 4000.00, NULL),
	(274, 'Ingreso', 20.00, 'Compra de tokens', '2024-11-22 21:16:46', NULL, 1, NULL, NULL, 88, 4000.00, NULL),
	(275, 'Ingreso', 1.00, 'Compra de tokens', '2024-11-22 21:17:29', NULL, 1, NULL, NULL, 85, 200.00, NULL),
	(276, 'Ingreso', 300.00, 'Compra de tokens', '2024-11-22 21:19:21', NULL, 1, NULL, NULL, 88, 60000.00, NULL),
	(277, 'Ingreso', 2000.00, 'Compra de tokens', '2024-11-22 21:20:21', NULL, 1, NULL, NULL, 127, 400000.00, NULL),
	(278, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 21:24:25', NULL, 1, 94, NULL, 88, 200.00, NULL),
	(279, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 21:24:25', NULL, 1, 94, NULL, 87, 200.00, NULL),
	(280, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 21:27:31', NULL, 1, 95, NULL, 88, 800.00, NULL),
	(281, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 21:27:31', NULL, 1, 95, NULL, 87, 800.00, NULL),
	(282, 'Egreso', NULL, 'Tokens invertidos', '2024-11-22 21:39:04', NULL, 1, 96, NULL, 127, 300.00, NULL),
	(283, 'Ingreso', NULL, 'Inversión recibida', '2024-11-22 21:39:04', NULL, 1, 96, NULL, 87, 300.00, NULL),
	(284, 'Ingreso', 200.00, 'Compra de tokens', '2024-11-22 21:41:23', NULL, 1, NULL, NULL, 127, 40000.00, NULL),
	(285, 'Ingreso', 13895700.00, 'Compra de tokens', '2024-11-22 21:42:49', NULL, 1, NULL, NULL, 127, 99999999.99, NULL),
	(286, 'Ingreso', 500000.00, 'Compra de tokens', '2024-11-22 21:43:03', NULL, 1, NULL, NULL, 127, 99999999.99, NULL),
	(287, 'Ingreso', 99999999.99, 'Compra de tokens', '2024-11-22 21:43:20', NULL, 1, NULL, NULL, 127, 99999999.99, NULL),
	(288, 'Ingreso', 100000.00, 'Compra de tokens', '2024-11-22 21:43:40', NULL, 1, NULL, NULL, 127, 20000000.00, NULL),
	(293, 'Ingreso', 123.00, 'Compra de tokens', '2024-11-23 10:36:22', NULL, 1, NULL, NULL, 84, 24600.00, NULL),
	(295, 'Ingreso', 99999999.99, 'Compra de tokens', '2024-11-23 10:45:53', NULL, 1, NULL, NULL, 84, 99999999.99, NULL),
	(296, 'Egreso', NULL, 'Tokens invertidos', '2024-11-23 10:47:02', NULL, 1, 97, NULL, 84, 300.00, NULL),
	(297, 'Ingreso', NULL, 'Inversión recibida', '2024-11-23 10:47:03', NULL, 1, 97, NULL, 87, 300.00, NULL),
	(298, 'Egreso', NULL, 'Tokens invertidos', '2024-11-23 10:47:25', NULL, 1, 98, NULL, 84, 1000.00, NULL),
	(299, 'Ingreso', NULL, 'Inversión recibida', '2024-11-23 10:47:25', NULL, 1, 98, NULL, 87, 1000.00, NULL),
	(300, 'Egreso', NULL, 'Tokens invertidos', '2024-11-23 10:53:37', NULL, 1, 99, NULL, 84, 2000.00, NULL),
	(301, 'Ingreso', NULL, 'Inversión recibida', '2024-11-23 10:53:38', NULL, 1, 99, NULL, 87, 2000.00, NULL),
	(302, 'Ingreso', 100000.00, 'Compra de tokens', '2024-11-24 02:33:05', NULL, 1, NULL, NULL, 136, 20000000.00, NULL),
	(303, 'Ingreso', 100000.00, 'Compra de tokens', '2024-11-24 03:06:54', NULL, 1, NULL, NULL, 136, 20000000.00, NULL),
	(309, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-24 04:40:09', NULL, 1, NULL, NULL, 136, 20000.00, NULL),
	(335, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-24 05:25:45', NULL, 1, NULL, NULL, 136, 20000.00, NULL),
	(336, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-24 05:26:39', NULL, 1, NULL, NULL, 136, 20000.00, NULL),
	(337, 'Ingreso', 2000.00, 'Compra de tokens', '2024-11-24 05:28:02', NULL, 1, NULL, NULL, 136, 400000.00, NULL),
	(338, 'Ingreso', 5000.00, 'Compra de tokens', '2024-11-24 05:28:49', NULL, 1, NULL, NULL, 136, 1000000.00, NULL),
	(339, 'Ingreso', 200.00, 'Compra de tokens', '2024-11-24 05:30:32', NULL, 1, NULL, NULL, 136, 40000.00, NULL),
	(341, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 22:59:51', NULL, 1, 100, NULL, 136, 100.00, NULL),
	(342, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 22:59:51', NULL, 1, 100, NULL, 135, 100.00, NULL),
	(343, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:01:00', NULL, 1, 101, NULL, 136, 50.00, NULL),
	(344, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:01:00', NULL, 1, 101, NULL, 135, 50.00, NULL),
	(345, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:01:08', NULL, 1, 102, NULL, 136, 50.00, NULL),
	(346, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:01:08', NULL, 1, 102, NULL, 135, 50.00, NULL),
	(347, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:02:04', NULL, 1, 103, NULL, 136, 800.00, NULL),
	(348, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:02:04', NULL, 1, 103, NULL, 135, 800.00, NULL),
	(349, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:02:52', NULL, 1, 104, NULL, 136, 600.00, NULL),
	(350, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:02:52', NULL, 1, 104, NULL, 135, 600.00, NULL),
	(351, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:06:05', NULL, 1, 105, NULL, 136, 500.00, NULL),
	(352, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:06:05', NULL, 1, 105, NULL, 135, 500.00, NULL),
	(353, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:06:20', NULL, 1, 106, NULL, 136, 100.00, NULL),
	(354, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:06:20', NULL, 1, 106, NULL, 135, 100.00, NULL),
	(355, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:07:02', NULL, 1, 107, NULL, 136, 50.00, NULL),
	(356, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:07:02', NULL, 1, 107, NULL, 135, 50.00, NULL),
	(357, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:07:18', NULL, 1, 108, NULL, 136, 100.00, NULL),
	(358, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:07:18', NULL, 1, 108, NULL, 135, 100.00, NULL),
	(359, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:08:02', NULL, 1, 109, NULL, 136, 50.00, NULL),
	(360, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:08:02', NULL, 1, 109, NULL, 135, 50.00, NULL),
	(361, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:08:07', NULL, 1, 110, NULL, 136, 50.00, NULL),
	(362, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:08:07', NULL, 1, 110, NULL, 135, 50.00, NULL),
	(363, 'Egreso', NULL, 'Tokens invertidos', '2024-11-24 23:08:11', NULL, 1, 111, NULL, 136, 50.00, NULL),
	(364, 'Ingreso', NULL, 'Inversión recibida', '2024-11-24 23:08:11', NULL, 1, 111, NULL, 135, 50.00, NULL),
	(365, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:10:52', NULL, 1, 112, NULL, 136, 100.00, NULL),
	(366, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:10:53', NULL, 1, 112, NULL, 135, 100.00, NULL),
	(367, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:12:48', NULL, 1, 113, NULL, 136, 400.00, NULL),
	(368, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:12:49', NULL, 1, 113, NULL, 135, 400.00, NULL),
	(369, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:13:03', NULL, 1, 114, NULL, 136, 100.00, NULL),
	(370, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:13:03', NULL, 1, 114, NULL, 135, 100.00, NULL),
	(371, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:15:51', NULL, 1, 115, NULL, 136, 900.00, NULL),
	(372, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:15:52', NULL, 1, 115, NULL, 135, 900.00, NULL),
	(373, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:16:05', NULL, 1, 116, NULL, 136, 100.00, NULL),
	(374, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:16:05', NULL, 1, 117, NULL, 136, 100.00, NULL),
	(375, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:16:05', NULL, 1, 117, NULL, 135, 100.00, NULL),
	(376, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:16:05', NULL, 1, 116, NULL, 135, 100.00, NULL),
	(377, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:21:15', NULL, 1, 118, NULL, 136, 100.00, NULL),
	(378, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:21:16', NULL, 1, 118, NULL, 135, 100.00, NULL),
	(379, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:23:00', NULL, 1, 119, NULL, 136, 500.00, NULL),
	(380, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:23:00', NULL, 1, 119, NULL, 135, 500.00, NULL),
	(381, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 00:23:09', NULL, 1, 120, NULL, 136, 500.00, NULL),
	(382, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 00:23:09', NULL, 1, 120, NULL, 135, 500.00, NULL),
	(383, 'Ingreso', 14.00, 'Compra de tokens', '2024-11-25 01:34:36', NULL, 1, NULL, NULL, 85, 2800.00, NULL),
	(384, 'Ingreso', 10.00, 'Compra de tokens', '2024-11-25 01:35:07', NULL, 1, NULL, NULL, 85, 2000.00, NULL),
	(385, 'Ingreso', 30.00, 'Compra de tokens', '2024-11-25 01:35:54', NULL, 1, NULL, NULL, 85, 6000.00, NULL),
	(386, 'Ingreso', 200.00, 'Compra de tokens', '2024-11-25 01:55:26', NULL, 1, NULL, NULL, 85, 40000.00, NULL),
	(387, 'Ingreso', 22.00, 'Compra de tokens', '2024-11-25 02:49:25', NULL, 1, NULL, NULL, 85, 4400.00, NULL),
	(388, 'Ingreso', 11.00, 'Compra de tokens', '2024-11-25 02:49:34', NULL, 1, NULL, NULL, 85, 2200.00, NULL),
	(389, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-25 03:10:14', NULL, 1, NULL, NULL, 136, 20000.00, NULL),
	(391, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 04:28:48', NULL, 1, 121, NULL, 88, 1200.00, NULL),
	(392, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 04:28:49', NULL, 1, 121, NULL, 87, 1200.00, NULL),
	(393, 'Ingreso', 2594.00, 'Compra de tokens', '2024-11-25 14:21:35', NULL, 1, NULL, NULL, 148, 518800.00, NULL),
	(394, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-25 14:37:00', NULL, 1, NULL, NULL, 149, 2000000.00, NULL),
	(395, 'Ingreso', 1000.00, 'Compra de tokens', '2024-11-25 14:37:52', NULL, 1, NULL, NULL, 140, 200000.00, NULL),
	(396, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 14:38:23', NULL, 1, NULL, 87, 140, 1000.00, NULL),
	(397, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 14:43:31', NULL, 1, 122, NULL, 140, 200.00, NULL),
	(398, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 14:43:31', NULL, 1, 122, NULL, 149, 200.00, NULL),
	(399, 'Egreso', NULL, 'Tokens invertidos', '2024-11-25 14:43:48', NULL, 1, 123, NULL, 140, 1000.00, NULL),
	(400, 'Ingreso', NULL, 'Inversión recibida', '2024-11-25 14:43:49', NULL, 1, 123, NULL, 149, 1000.00, NULL),
	(401, 'Ingreso', 500.00, 'Compra de tokens', '2024-11-25 14:53:47', NULL, 1, NULL, NULL, 144, 100000.00, NULL),
	(402, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 15:52:44', NULL, 1, NULL, 88, 149, 1200.00, NULL),
	(403, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 15:53:27', NULL, 1, NULL, 89, 149, 1200.00, NULL),
	(404, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 15:55:36', NULL, 1, NULL, 90, 149, 1200.00, NULL),
	(405, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 15:57:10', NULL, 1, NULL, 91, 149, 1200.00, NULL),
	(406, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 15:57:30', NULL, 1, NULL, 92, 149, 1200.00, NULL),
	(407, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 16:00:31', NULL, 1, NULL, 93, 149, 1200.00, NULL),
	(408, 'Ingreso', 500.00, 'Compra de tokens', '2024-11-25 16:11:57', NULL, 1, NULL, NULL, 142, 100000.00, NULL),
	(409, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 16:15:40', NULL, 1, NULL, 94, 142, 1000.00, NULL),
	(410, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 16:32:59', NULL, 1, NULL, 95, 149, 1000.00, NULL),
	(411, 'Egreso', NULL, 'Por solicitud de retiro', '2024-11-25 16:33:14', NULL, 1, NULL, 96, 149, 200.00, NULL),
	(412, 'Ingreso', 400.00, 'Compra de tokens', '2024-11-25 18:59:27', NULL, 1, NULL, NULL, 148, 80000.00, NULL),
	(413, 'Ingreso', 500.00, 'Compra de tokens', '2024-11-25 18:59:56', NULL, 1, NULL, NULL, 148, 100000.00, NULL),
	(414, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-25 19:00:04', NULL, 1, NULL, NULL, 148, 2000000.00, NULL),
	(415, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 19:52:06', NULL, 1, NULL, 97, 142, 100.00, NULL),
	(416, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 19:52:38', NULL, 1, NULL, 98, 142, 8900.00, NULL),
	(417, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 19:53:23', NULL, 1, NULL, 99, 142, 3000.00, NULL),
	(418, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-25 19:58:25', NULL, 1, 124, NULL, 140, 1000.00, NULL),
	(419, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-25 19:58:26', NULL, 1, 124, NULL, 145, 1000.00, NULL),
	(420, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-25 21:50:23', NULL, 1, 125, NULL, 148, 50000.00, NULL),
	(421, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-25 21:50:24', NULL, 1, 125, NULL, 151, 50000.00, NULL),
	(422, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-25 21:51:35', NULL, 1, 126, NULL, 148, 2000.00, NULL),
	(423, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-25 21:51:35', NULL, 1, 126, NULL, 145, 2000.00, NULL),
	(424, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 22:36:43', NULL, 1, NULL, 100, 148, 200.00, NULL),
	(425, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 23:36:28', NULL, 1, NULL, 101, 149, 100.00, NULL),
	(426, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-25 23:36:56', NULL, 1, NULL, 102, 149, 100000.00, NULL),
	(427, 'Ingreso', 12.00, 'Compra de tokens', '2024-11-26 14:16:31', NULL, 1, NULL, NULL, 144, 2400.00, NULL),
	(428, 'Ingreso', 40.00, 'Compra de tokens', '2024-11-26 14:20:15', NULL, 1, NULL, NULL, 144, 8000.00, NULL),
	(429, 'Ingreso', 15.00, 'Compra de tokens', '2024-11-26 14:21:55', NULL, 1, NULL, NULL, 151, 3000.00, NULL),
	(430, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 14:22:47', NULL, 1, NULL, 103, 151, 5300.00, NULL),
	(431, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-26 15:37:17', NULL, 1, NULL, NULL, 161, 2000000.00, NULL),
	(432, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 15:39:52', NULL, 1, NULL, 104, 161, 10.00, NULL),
	(433, 'Egreso', 0.05, NULL, '2024-11-26 11:41:39', NULL, 1, NULL, 104, 161, 10.00, NULL),
	(434, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 15:49:57', NULL, 1, NULL, 105, 161, 100.00, NULL),
	(435, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-26 15:52:19', NULL, 1, 127, NULL, 161, 1000.00, NULL),
	(436, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-26 15:52:19', NULL, 1, 127, NULL, 149, 1000.00, NULL),
	(437, 'Egreso', 0.97, NULL, '2024-11-26 14:30:01', NULL, 1, NULL, 96, 149, 200.00, NULL),
	(438, 'Egreso', 4.85, NULL, '2024-11-26 14:49:38', NULL, 1, NULL, 95, 149, 1000.00, NULL),
	(439, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-26 20:22:51', NULL, 1, NULL, NULL, 143, 2000000.00, NULL),
	(440, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 20:23:00', NULL, 1, NULL, 106, 143, 100.00, NULL),
	(441, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-26 20:24:10', NULL, 1, 128, NULL, 140, 800.00, NULL),
	(442, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-26 20:24:11', NULL, 1, 128, NULL, 149, 800.00, NULL),
	(443, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-26 20:24:45', NULL, 1, 129, NULL, 140, 1000.00, NULL),
	(444, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-26 20:24:45', NULL, 1, 129, NULL, 149, 1000.00, NULL),
	(445, 'Ingreso', 25.00, 'Compra de tokens', '2024-11-26 20:35:07', NULL, 1, NULL, NULL, 140, 5000.00, NULL),
	(446, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-26 20:39:10', NULL, 1, 130, NULL, 143, 300.00, NULL),
	(447, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-26 20:39:10', NULL, 1, 130, NULL, 149, 300.00, NULL),
	(448, 'Ingreso', 1250.00, 'Compra de tokens', '2024-11-26 20:50:48', NULL, 1, NULL, NULL, 140, 250000.00, NULL),
	(449, 'Ingreso', 1500.00, 'Compra de tokens', '2024-11-26 21:00:04', NULL, 1, NULL, NULL, 145, 300000.00, NULL),
	(450, 'Ingreso', 25.00, 'Compra de tokens', '2024-11-26 22:48:33', NULL, 0, NULL, NULL, 140, 5000.00, NULL),
	(451, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 22:57:18', NULL, 1, NULL, 107, 140, 5000.00, NULL),
	(452, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 22:58:35', NULL, 1, NULL, 108, 140, 5000.00, NULL),
	(453, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-26 23:01:07', NULL, 1, 131, NULL, 140, 800.00, NULL),
	(454, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-26 23:01:07', NULL, 1, 131, NULL, 145, 800.00, NULL),
	(455, 'Ingreso', 6.00, 'Compra de tokens', '2024-11-26 23:55:26', NULL, 0, NULL, NULL, 145, 1200.00, NULL),
	(456, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-26 23:56:08', NULL, 1, NULL, 109, 145, 5000.00, NULL),
	(457, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-27 06:26:55', NULL, 1, 132, NULL, 143, 600.00, NULL),
	(458, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-27 06:26:56', NULL, 1, 132, NULL, 145, 600.00, NULL),
	(459, 'Ingreso', 10.00, 'Compra de tokens', '2024-11-27 13:52:50', NULL, 1, NULL, NULL, 144, 2000.00, NULL),
	(460, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-27 13:53:01', NULL, 1, NULL, 110, 144, 5.00, NULL),
	(461, 'Ingreso', 5000.00, 'Compra de tokens', '2024-11-27 21:08:29', NULL, 0, NULL, NULL, 166, 1000000.00, NULL),
	(462, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-27 21:09:48', NULL, 1, NULL, 111, 166, 500.00, NULL),
	(463, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-27 21:13:14', NULL, 0, NULL, NULL, 143, 2000000.00, NULL),
	(464, 'Egreso', 0.00, 'Por solicitud de retiro', '2024-11-27 21:13:36', NULL, 1, NULL, 112, 143, 38000.00, NULL),
	(465, 'Egreso', 0.00, 'Tokens invertidos', '2024-11-27 21:15:33', NULL, 1, 133, NULL, 143, 500.00, NULL),
	(466, 'Ingreso', 0.00, 'Inversión recibida', '2024-11-27 21:15:33', NULL, 1, 133, NULL, 144, 500.00, NULL),
	(467, 'Egreso', 24.25, NULL, '2024-11-28 18:21:21', NULL, 1, NULL, 107, 140, 5000.00, NULL),
	(468, 'Egreso', 4.85, NULL, '2024-11-28 18:22:29', NULL, 1, NULL, 87, 140, 1000.00, NULL),
	(469, 'Egreso', 184.30, NULL, '2024-11-28 18:28:36', NULL, 1, NULL, 112, 143, 38000.00, NULL),
	(470, 'Ingreso', 123.00, 'Compra de tokens', '2024-11-29 14:33:51', NULL, 0, NULL, NULL, 145, 24600.00, NULL),
	(471, 'Ingreso', 12.00, 'Compra de tokens', '2024-11-29 14:34:07', NULL, 0, NULL, NULL, 145, 2400.00, NULL),
	(472, 'Ingreso', 2.50, 'Compra de tokens rechazada', '2024-11-29 14:40:40', NULL, 0, NULL, NULL, 143, 500.00, NULL),
	(473, 'Ingreso', 2.50, 'Compra de tokens rechazada', '2024-11-29 15:12:24', NULL, 0, NULL, NULL, 140, 500.00, NULL),
	(474, 'Ingreso', 2.50, 'Compra de tokens', '2024-11-29 15:19:41', '2024-11-29', 1, NULL, NULL, 140, 500.00, NULL),
	(475, 'Ingreso', 1000.00, 'Compra de tokens', '2024-11-30 05:35:45', NULL, 0, NULL, NULL, 143, 300000.00, NULL),
	(476, 'Ingreso', 10000.00, 'Compra de tokens', '2024-11-30 05:36:17', NULL, 0, NULL, NULL, 143, 3000000.00, NULL),
	(477, 'Ingreso', 1000.00, 'Compra de tokens', '2024-11-30 05:36:47', '2024-12-01', 1, NULL, NULL, 143, 300000.00, NULL),
	(478, 'Ingreso', 1100.00, 'Compra de tokens rechazada', '2024-11-30 05:37:25', NULL, 0, NULL, NULL, 143, 330000.00, NULL),
	(479, 'Ingreso', 100.00, 'Compra de tokens rechazada', '2024-11-30 05:37:42', NULL, 0, NULL, NULL, 143, 30000.00, NULL),
	(480, 'Ingreso', 2000.00, 'Compra de tokens', '2024-11-30 05:37:53', '2024-12-01', 1, NULL, NULL, 143, 600000.00, NULL),
	(481, 'Ingreso', 100.00, 'Compra de tokens', '2024-11-30 05:38:43', '2024-12-01', 1, NULL, NULL, 143, 30000.00, NULL),
	(482, 'Egreso', 0.00, 'Tokens invertidos', '2024-12-13 01:19:02', NULL, 1, 134, NULL, 143, 200.00, NULL),
	(483, 'Ingreso', 0.00, 'Inversión recibida', '2024-12-13 01:19:02', NULL, 1, 134, NULL, 149, 200.00, NULL),
	(484, 'Egreso', 0.00, 'Tokens invertidos', '2024-12-13 01:25:40', NULL, 1, 135, NULL, 143, 800.00, NULL),
	(485, 'Ingreso', 0.00, 'Inversión recibida', '2024-12-13 01:25:40', NULL, 1, 135, NULL, 149, 800.00, NULL);

-- Volcando estructura para tabla railway.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `imagen_portada` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contenido` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `estado` enum('Activo','Inactivo') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Inactivo',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.posts: ~3 rows (aproximadamente)
INSERT INTO `posts` (`post_id`, `titulo`, `imagen_portada`, `contenido`, `estado`, `created_at`, `updated_at`) VALUES
	(1, 'Guia Inversor', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732721112/posts/posts/1732721109722.png', '<h1><span style="background-color: var(--bs-modal-bg); color: var(--bs-heading-color); font-size: 2.5rem; text-align: var(--bs-body-text-align);">Guía para el usuario con rol Inversores</span></h1><h2>Introducción</h2><p>La plataforma conecta inversores con talentos en diversos campos. Esta guía te ayudará a realizar inversiones y manejar tus tokens.</p><p>Desde "Soporte", elige:</p><ul><li><b>Chat en Vivo:</b> Para atención inmediata.</li><li><b>Formulario:</b> Reporta problemas con capturas de pantalla.</li></ul>', 'Inactivo', '2024-10-22 20:07:49', '2024-10-22 20:07:49'),
	(2, 'Requisitos Previos', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732720897/posts/posts/1732720894376.png', '<br>\r\n<h2>Guía para el usuario con rol Talento</h2>\r\n<ol>\r\n	<li>\r\n	Como talento, puedes recibir inversiones y gestionar proyectos. Esta guía te ayudará a aprovechar al máximo tus herramientas.</li>\r\n	<hr>\r\n	<li>\r\n	<ul>\r\n		<li>Cuenta Registrada: Completa el proceso de registro.</li>		\r\n		<li>Perfil Completo: Verifica y actualiza tu información.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Acceso al Sistema</h3>\r\n	<ul>\r\n		<li>Iniciar Sesión: Ingresa tu correo y contraseña.</li>		\r\n		<li>Actualizar Perfil: Revisa datos personales en "Mi Perfil".</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Seguimiento de Inversiones</h3>\r\n		<ul>\r\n		<li>Consultar Inversiones: Accede a "Mi Billetera" para ver el estado de los proyectos.</li>\r\n		<li>Notificaciones: Recibe alertas sobre devoluciones pendientes.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Retiro de Beneficios</h3>\r\n		<ul>\r\n		<li>Verificar Saldo: Revisa tus ganancias disponibles.</li>		\r\n		<li>Seleccionar Método de Retiro: Transferencia bancaria o conversión de tokens.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Soporte Técnico</h3>\r\n	Desde "Soporte", accede al:\r\n		<ul>\r\n		<li>Chat en Vivo: Atención rápida.</li>\r\n		<li>Formulario: Detalla problemas con capturas de pantalla.</li></ul>\r\n	</li>\r\n	<hr></ol>', 'Activo', '2024-10-22 22:52:23', '2024-10-22 22:52:23'),
	(3, 'Guia Admin', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732720919/posts/posts/1732720916205.png', '<br>\r\n<h2>Guía para el usuario con rol Administrador</h2>\r\n<ol>\r\n	<li>\r\n	La guía detalla las funcionalidades básicas disponibles para un Administrador en la plataforma Hamilo Inversiones. Aquí encontrarás todo lo necesario para gestionar usuarios, guías, solicitudes, y más.</li>\r\n	<hr>\r\n	<li><h3>Cambiar Imagen</h3>\r\n	El administrador puede subir una nueva imagen en cualquier sección donde aparezca el ícono de editar imágen.<br>\r\n	Al seleccionarlo, se abrirá una ventana para elegir y cargar una nueva imagen.</li>\r\n	<hr>\r\n	<li><h3>Editar Texto</h3>\r\n	Donde aparezca el ícono de editar texto, el administrador puede modificar textos y actualizar la información mostrada en la plataforma.</li>\r\n	<hr>\r\n	<li><h3>Solicitudes de Retiro</h3>\r\n	El administrador puede aprobar o rechazar retiros desde la sección Solicitudes de Retiro, disponible en el menú lateral izquierdo tras hacer clic en el botón del administrador, que se encuentra en la parte derecha del menú superior.<br>\r\n\r\n	En esta sección:\r\n		<ul>\r\n		<li>✅ Aprobar solicitud\r\n		</li><li>❌ Rechazar solicitud</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Gestión de Usuarios</h3>\r\n	Desde la sección Usuarios, el administrador puede:\r\n		<ul>\r\n		<li>Asignar Roles: Cambiar el rol de los usuarios.</li>\r\n		<li>Aprobar Registro: Cambiar el estado de admisión entre aprobado/no aprobado.</li>\r\n		<li>Activar/Inactivar Usuarios: Alternar el estado con los íconos ➕ y ➖.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Gestión de Guías</h3>\r\n	En la sección Guías, el administrador puede:\r\n		<ul>\r\n		<li>Editar el contenido.</li>\r\n		<li>Aceptar correcciones realizadas.</li>\r\n		<li>Eliminar guías con el botón ❌.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Categorías</h3>\r\n	Desde la sección Categorías, se pueden crear nuevas categorías. El formulario incluye:\r\n		<ul>\r\n		<li>Nombre: Título de la categoría (una palabra sugerida).</li>\r\n		<li>Imagen: Ícono representativo.</li>\r\n		<li>Botón Crear: Guarda la categoría y la lista en la tabla.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Consultas y Reclamos</h3>\r\n	En la sección Consultas y Reclamos, el administrador puede:\r\n		<ul>\r\n		<li>Responder: Completar un formulario para contestar consultas pendientes.</li>\r\n		<li>Actualizar Estados: Cambiar el estado de las consultas.</li></ul>\r\n	</li>\r\n	<hr>\r\n	<li><h3>Reportes</h3>\r\n	Muestra gráficos con resúmenes de operaciones realizadas en la plataforma. Incluye opciones para descargar reportes.</li>\r\n	<hr>\r\n	<li><h3>Ajustes</h3>\r\n	Se accede desde el menú lateral y permite modificar datos de la plataforma a través de formularios editables.</li>\r\n	<hr>\r\n	<li><h3>Preguntas Frecuentes (FAQs)</h3>\r\n	El administrador puede:\r\n	<ul>\r\n	<li>Agregar FAQs: Completar un formulario con una pregunta y respuesta.</li>\r\n	<li>Editar FAQs: Modificar preguntas o respuestas existentes.</li>\r\n	<li>Eliminar FAQs: Quitar entradas seleccionadas.</li></ul>\r\n	</li>\r\n	<hr></ol>', 'Activo', '2024-10-23 02:23:56', '2024-10-23 02:23:56');

-- Volcando estructura para tabla railway.respuesta
CREATE TABLE IF NOT EXISTS `respuesta` (
  `respuesta_id` int NOT NULL,
  `comentario_id` int DEFAULT NULL,
  `inversor_id` int DEFAULT NULL,
  `respuesta` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`respuesta_id`),
  KEY `fk_comentario_idx` (`comentario_id`),
  CONSTRAINT `fk_comentario_idx` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id_comentarios`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.respuesta: ~0 rows (aproximadamente)

-- Volcando estructura para tabla railway.solicitudes_inversion
CREATE TABLE IF NOT EXISTS `solicitudes_inversion` (
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
  `estado_inversion` enum('Pendiente','Proceso','Finalizado','Reversion') COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `si_cliente_id` (`cliente_id`) USING BTREE,
  CONSTRAINT `si_cliente_id` FOREIGN KEY (`cliente_id`) REFERENCES `usuarios` (`usuario_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Volcando datos para la tabla railway.solicitudes_inversion: ~12 rows (aproximadamente)
INSERT INTO `solicitudes_inversion` (`id`, `cliente_id`, `nombre`, `descripcion`, `fecha_inicio_recaudacion`, `fecha_fin_recaudacion`, `monto`, `cantidad_pagos`, `fecha_inicio_pago`, `fecha_fin_pago`, `aprobado`, `estado`, `observaciones`, `estado_inversion`) VALUES
	(1, 149, 'Cliente', 'Desarrollo de software Backend', '2024-01-12', '2024-02-12', 3000.00, 6, '2024-04-22', '2024-10-23', 'Aprobado', 1, '', 'Reversion'),
	(2, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Rechazado', 1, 'rerearea', NULL),
	(3, 145, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Rechazado', 1, 'fdsfdsa', 'Reversion'),
	(4, 145, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Rechazado', 1, 'fsdafsda', 'Reversion'),
	(5, 144, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Rechazado', 3, 'reacahzado', 'Reversion'),
	(6, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Rechazado', 1, 'ffdsfdsfdsfdsafdsafadfdsafdsfdsfdsa', NULL),
	(7, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 2, 'fdsafdsafds', NULL),
	(8, 151, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 1, 'fdsfdsfdsa', 'Reversion'),
	(9, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 1, 'fdsafdsafdsa', NULL),
	(10, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 1, NULL, NULL),
	(11, 169, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 1, NULL, 'Reversion'),
	(12, 149, 'Danny', 'Desarrollo de software Frontes', '2024-12-11', '2025-03-11', 2000.00, 4, '2025-04-11', '2024-08-11', 'Pendiente', 1, NULL, 'Reversion'),
	(13, 149, 'Inversión Actualizada', 'Descripción actualizada de la inversión', '2023-10-01', '2023-12-01', 15000.00, 12, '2024-01-01', '2024-12-01', 'Pendiente', 1, NULL, 'Reversion'),
	(14, 169, 'Inversión Actualizada', 'Descripción actualizada de la inversión', '2023-10-01', '2023-12-01', 15000.00, 12, '2024-01-01', '2024-12-01', 'Pendiente', 1, NULL, NULL),
	(17, 168, 'Dolore officiis volu', 'Similique dolore mol', '1995-10-17', '2001-05-13', 2000.00, 25, '1993-02-24', '1995-03-24', 'Aprobado', 1, NULL, NULL),
	(18, 168, 'Quo nesciunt quis a', 'Sed praesentium libe', '2016-07-21', '1996-07-01', 6000.00, 62, '2003-10-10', '2008-12-10', 'Pendiente', 1, NULL, NULL),
	(19, 168, 'Laboris iusto aut fu', 'Eum quasi aut magna ', '1982-07-27', '2001-07-20', 94000.00, 43, '1994-03-07', '1997-10-07', 'Pendiente', 1, NULL, NULL),
	(20, 145, '     ', '     ', '2000-10-10', '2000-10-10', -10.00, -10, '1999-10-10', '1999-10-10', 'Pendiente', 1, NULL, NULL);

-- Volcando estructura para tabla railway.solicitudes_retiro
CREATE TABLE IF NOT EXISTS `solicitudes_retiro` (
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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.solicitudes_retiro: ~26 rows (aproximadamente)
INSERT INTO `solicitudes_retiro` (`retiro_id`, `tipo`, `usuario_id`, `monto_solicitud`, `tokens_cambio`, `comision_aplicar`, `monto_recibir`, `fecha_solicitud`, `fecha_aprobacion`, `foto_identificacion`, `selfie_identificacion`, `estado`, `inversion_id`) VALUES
	(87, 'inversor', 140, 5.00, 1000.00, 0.15, 4.85, '2024-11-24 00:00:00', '2024-11-28', NULL, NULL, 'Aprobado', NULL),
	(88, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 15:52:44', NULL, NULL, NULL, 'Pendiente', NULL),
	(89, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 15:53:26', NULL, NULL, NULL, 'Pendiente', NULL),
	(90, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 15:55:36', NULL, NULL, NULL, 'Pendiente', NULL),
	(91, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 15:57:10', NULL, NULL, NULL, 'Pendiente', NULL),
	(92, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 15:57:29', NULL, NULL, NULL, 'Pendiente', NULL),
	(93, 'cliente', 149, 6.00, 1200.00, 0.18, 5.82, '2024-11-25 16:00:31', NULL, NULL, NULL, 'Pendiente', NULL),
	(94, 'cliente', 142, 5.00, 1000.00, 0.15, 4.85, '2024-11-25 16:15:39', NULL, NULL, NULL, 'Pendiente', NULL),
	(95, 'cliente', 149, 5.00, 1000.00, 0.15, 4.85, '2024-11-25 16:32:59', '2024-11-26', NULL, NULL, 'Aprobado', NULL),
	(96, 'cliente', 149, 1.00, 200.00, 0.03, 0.97, '2024-11-25 16:33:14', '2024-11-26', NULL, NULL, 'Aprobado', NULL),
	(97, 'cliente', 142, 0.50, 100.00, 0.02, 0.49, '2024-11-25 19:52:06', NULL, NULL, NULL, 'Pendiente', NULL),
	(98, 'cliente', 142, 44.50, 8900.00, 1.34, 43.17, '2024-11-25 19:52:38', NULL, NULL, NULL, 'Pendiente', NULL),
	(99, 'cliente', 142, 15.00, 3000.00, 0.45, 14.55, '2024-11-25 19:53:23', NULL, NULL, NULL, 'Pendiente', NULL),
	(100, 'inversor', 148, 1.00, 200.00, 0.03, 0.97, '2024-11-25 22:36:43', NULL, NULL, NULL, 'Pendiente', NULL),
	(101, 'cliente', 149, 0.50, 100.00, 0.02, 0.49, '2024-11-25 23:36:28', NULL, NULL, NULL, 'Pendiente', NULL),
	(102, 'cliente', 149, 500.00, 100000.00, 15.00, 485.00, '2024-11-25 23:36:56', NULL, NULL, NULL, 'Pendiente', NULL),
	(103, 'cliente', 151, 26.50, 5300.00, 0.79, 25.71, '2024-11-26 14:22:47', NULL, NULL, NULL, 'Pendiente', NULL),
	(104, 'inversor', 161, 0.05, 10.00, 0.00, 0.05, '2024-11-26 15:39:51', '2024-11-26', NULL, NULL, 'Aprobado', NULL),
	(105, 'inversor', 161, 0.50, 100.00, 0.02, 0.49, '2024-11-26 15:49:56', NULL, NULL, NULL, 'Pendiente', NULL),
	(106, 'inversor', 143, 0.50, 100.00, 0.02, 0.49, '2024-11-26 20:22:59', NULL, NULL, NULL, 'Pendiente', NULL),
	(107, 'inversor', 140, 25.00, 5000.00, 0.75, 24.25, '2024-11-26 22:57:17', '2024-11-28', NULL, NULL, 'Aprobado', NULL),
	(108, 'inversor', 140, 25.00, 5000.00, 0.75, 24.25, '2024-11-26 22:58:35', NULL, NULL, NULL, 'Pendiente', NULL),
	(109, 'cliente', 145, 25.00, 5000.00, 0.75, 24.25, '2024-11-26 23:56:07', NULL, NULL, NULL, 'Pendiente', NULL),
	(110, 'cliente', 144, 0.03, 5.00, 0.00, 0.02, '2024-11-27 13:53:01', NULL, NULL, NULL, 'Pendiente', NULL),
	(111, 'cliente', 166, 2.50, 500.00, 0.08, 2.43, '2024-11-27 21:09:47', NULL, NULL, NULL, 'Pendiente', NULL),
	(112, 'inversor', 143, 190.00, 38000.00, 5.70, 184.30, '2024-11-27 21:13:36', '2024-11-28', NULL, NULL, 'Aprobado', NULL);

-- Volcando estructura para tabla railway.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
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
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla railway.usuarios: ~25 rows (aproximadamente)
INSERT INTO `usuarios` (`usuario_id`, `nombre`, `apellido`, `correo`, `codigo_pais`, `numero_telefono`, `username`, `pais_residencia`, `password`, `edad`, `acepta_terminos`, `categoria_persona_id`, `rol`, `created_at`, `updated_at`, `estado`, `cod_verificacion`, `verificado`, `saldo_total`, `registrado_por`, `aprobado`, `resetPasswordToken`, `resetPasswordExpires`, `genero`, `imagen`, `video`, `porcentaje_registro`) VALUES
	(140, 'Brian', 'Villarroel', 'braal.vf@gmail.com', '+591', '76543210', 'Brian - Villarroel', 'Bolivia', '$2b$10$QfURX5A.flFB9CYg/vo7uO4lIpN.DJBmW9oruYpKVruyIatgMZcU6', 32, 1, 16, 'Inversionista', '2024-11-25 13:37:00', '2024-11-25 13:37:00', 1, '1e80ab3a68c8ecb03cbd77dc5042bda28e357038', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732544180/clients/140.jpg', NULL, '100%'),
	(142, 'cecilia ', 'Velarde', 'airamposoruco@gmail.com', '+591', '60397621', 'cecilia  - Velarde', 'Bolivia', '$2b$10$rGg18E/rfqdJvtbU78lhJ.BLTcK6ejLllptG/LRaWENrr/oJVM6kW', 33, 1, NULL, 'Admin', '2024-11-25 13:38:28', '2024-11-25 13:38:28', 1, 'c6ada34e5f6096d23d45d2ec9799217a1c549ff1', 1, 0.00, '', 1, NULL, NULL, 'mujer', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732549700/clients/142.jpg', NULL, '20%'),
	(143, 'inversionista', 'inver', 'inver@gmail.com', '+591', '45645645', 'inversionista - inver', 'Bolivia', '$2b$10$cbaTGqNRwxjE2UezjKWD0es/lOHX1Adk4pjfNSadsT7yy3TNetB.W', 24, 1, 16, 'Inversionista', '2024-11-25 13:41:25', '2024-11-25 13:41:25', 1, '7658ef742c85cad0aa890703ba8f3b691666f002', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732652362/clients/143.png', NULL, '100%'),
	(144, 'Victor Hugo', 'Bolivia', 'victorhugo31103@gmail.com', '+591', '62554738', 'Victor Hugo - Bolivia', 'Argentina', '$2b$10$UERZZYj0IoPYkNQKQJZhd.tL2AHUsikYU/5fp8e/hsVQyQGinjMxy', 32, 1, NULL, 'Cliente', '2024-11-25 13:42:16', '2024-11-25 13:42:16', 1, '20d6894bfa066b5e380b563d04955b288cd2b85a', 1, 0.00, '', 1, NULL, NULL, '', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732545074/clients/144.png', NULL, '100%'),
	(145, 'Jonathan', 'Villarroel', 'guilad1233@gmail.com', '+591', '75946778', 'Jonathan - Villarroel', 'Bolivia', '$2b$10$Z3bIYqaitNdcoaQ0mrYBmOHtowmKwEXAehxsUK3YeVrFrap6JT07y', 20, 1, 19, 'Cliente', '2024-11-25 13:46:35', '2024-11-25 13:46:35', 1, '0d0bf76cec374dd70d10793b1b72e22cf21a58e3', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dpb4sg7pc/image/upload/v1732543762/clients/145.jpg', NULL, '60%'),
	(148, 'Alex', 'Bolivia', 'alexandercortezorias@gmail.com', '+591', '77563943', 'Alex - Bolivia', 'Bolivia', '$2b$10$PFIqFwS0FJRk9WXBhd3/nubei3r6toWNMbeKvILymDsQ0LcpU.3Nu', 32, 1, 16, 'Inversionista', '2024-11-25 13:56:40', '2024-11-25 13:56:40', 1, 'a424eccc2aa5ae8b7db969fc62509179a60d5da7', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732543840/clients/148.jpg', NULL, '100%'),
	(149, 'cliente', 'talento', 'cliente@gmail.com', '+591', '12121212', 'cliente - talento', 'Bolivia', '$2b$10$US35l7jTZVpP5vhw7PNbSuOBIof.L.g3UUUbekn4Jv6evpzAnlbqO', 24, 1, 19, 'Cliente', '2024-11-25 14:01:49', '2024-11-25 14:01:49', 1, 'a704ac94bc2049d06e79d25ee1f28307103b5026', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732544817/clients/149.png', NULL, '100%'),
	(150, 'admin', 'admin', 'admin@gmail.com', '+54', '78787878', 'admin - admin', 'Argentina', '$2b$10$x4CZx8LXdpr/l66DOfj/5.9aJ.ce/ELXoF6M098x0xbd0D3sFsy4e', 24, 1, 16, 'Admin', '2024-11-25 14:05:15', '2024-11-25 14:05:15', 1, 'bd0c7fa5f936eafedd68ffee0fa0f98d3875d647', 1, 0.00, '', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(151, 'leandro', 'ledezma', 'lleandroledezma@gmail.com', '+591', '61814110', 'leandro - ledezma', 'Bolivia', '$2b$10$a5hn6r08RjbTR7XTuFTJYOGszBj0Pqk1JBVXCfK/DWo9OxxwKSkqu', 25, 1, NULL, 'Cliente', '2024-11-25 14:07:32', '2024-11-25 14:07:32', 1, 'f014ca117ed281b09269c6b33e276ba2a41ae9ac', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732545500/clients/151.jpg', NULL, '100%'),
	(152, 'Pedro', 'Olmos', 'pedro@gmail.com', '+54', '+1 (224) 414-8779', 'Pedro - Olmos', 'Peru', '$2b$10$tpGUZXl5Eao1C6TQeXSmz.1ZFzUEtladFjiXiY6vTkY0nJOlkKsDq', 29, 1, 16, 'Null', '2024-11-25 14:07:53', '2024-11-25 14:07:53', 1, '593d70c7856ec23f12b26f54ccc5f41a0ef07cfb', 1, 0.00, '', 0, NULL, NULL, '', NULL, NULL, '0%'),
	(153, 'torman', 'Guard', 'toromanguard@gmail.com', '+591', '77563936', 'torman - Guard', 'Bolivia', '$2b$10$CIsOFveerAkfK7zoS6zRE.u51ekOw7Ax19XidpesfHUQDw1VqUvgS', 58, 1, NULL, 'Cliente', '2024-11-25 14:42:03', '2024-11-25 14:42:03', 1, '771a9a8cff786cf8523ab0e451cce091015ddd18', 1, 0.00, '', 0, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732546795/clients/153.jpg', NULL, '80%'),
	(156, 'Gabriel', 'Vargas', 'gabrielgonzalovargas.8@gmail.com', '+506', '74174111', 'Gabriel - Vargas', 'Costa Rica', '$2b$10$.oPSu.6dzzecApuAx.X7P.WVr/ig3CUvZDC9RW3SYDnYNm8coFukq', 83, 1, 16, 'Cliente', '2024-11-25 20:00:27', '2024-11-25 20:00:27', 1, 'cd3c1220f8843a0175370d3121c90251c0df0a12', 1, 0.00, '', 0, 'c1267e5181f564bb40d1e39e32a93a6487d9b9ab', 1733116102036, 'hombre', NULL, NULL, '0%'),
	(157, 'Cristian ', 'Bolivia', 'andres.carvajal.garcia16@gmail.com', '+591', '79367210', 'Cristian  - Bolivia', 'Bolivia', '$2b$10$3loA4QeymniYzjLdw14ZIu271Wq3vp6h4fX8Fz2EWXhoMZUCbbzA.', 24, 1, 16, 'Null', '2024-11-26 13:36:18', '2024-11-26 13:36:18', 1, '9d96bad79acd93968c0c4c966072280f694e27d0', 1, 0.00, '', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(158, 'Prueba', 'Usuario', 'prueba@test.com', '+54', '87654321', 'Prueba - Usuario', 'Argentina', '$2b$10$0.UWl9gt9./H6H1Ct2mFZO9M.Jlv3iXRX9A4s7WwF/boirB/Jsy42', 32, 1, 16, 'Null', '2024-11-26 14:22:38', '2024-11-26 14:22:38', 1, '47bbd44c0c95f6abd11c9e6c859ee6066af3fcde', 1, 0.00, '', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(159, 'leo', 'leo', 'a@a.com', '+591', '12312312', 'leo - leo', 'Bolivia', '$2b$10$WRYG7bVLQi2seauoOCt9b.CItuakWZap.h.5E7HJJhlJajOUcTj2K', 19, 1, NULL, 'Cliente', '2024-11-26 14:46:50', '2024-11-26 14:46:50', 1, 'ddb090b067308aca2e3c5c693e496b743fa31efb', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'hombre', NULL, NULL, '60%'),
	(160, 'leo', 'leo', 'leo@gmail.com', '+54', '56565655', 'leo - leo', 'Argentina', '$2b$10$v2ElNMcWWIVb3dcsLlxdseLbKOUV8/bLumGraHhUlMGuSpOfDrL8O', 24, 1, 18, 'Inversionista', '2024-11-26 15:26:24', '2024-11-26 15:26:24', 1, 'ce14f633e841c7d6ded4dd0390b494f075fd507c', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'hombre', NULL, NULL, '50%'),
	(161, 'leo', 'leo', 'leo2@gmail.com', '+591', '23232323', 'leo - leo', 'Argentina', '$2b$10$7TLQh2qCq1WtbuD6pXVuE.0Yg.VdsFcjBWl4U2mKyXO18eKjxpADe', 24, 1, 19, 'Inversionista', '2024-11-26 15:29:10', '2024-11-26 15:29:10', 1, '4dfe917d6fdcae87a93aeef2c373e637501f3ba2', 1, 0.00, 'admin@gmail.com', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732635318/clients/161.png', NULL, '100%'),
	(162, 'ewq', 'weq', 's@gmail.com', '+591', '1234123456781234', 'ewq - weq', 'Bolivia', '$2b$10$wYTx4Nsj8SzHYYxkmqVEked2aLGsUoKHRFL2zBdon9Wwxl5kTr.hq', 24, 1, 16, 'Null', '2024-11-27 14:03:53', '2024-11-27 14:03:53', 1, '2f92d8bed33c2becb0d8c9e357f3083b4101dba5', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'mujer', NULL, NULL, '0%'),
	(163, 'eew', 'qwe', 'q@gmail.com', '+55', '20202020202', 'eew - qwe', 'Brazil', '$2b$10$uAv0U9NceK0jJwJ4jE3mN.CqzHuvy7YQnd6U13.NgHnR9BPO4b3Cy', 24, 1, 19, 'Null', '2024-11-27 14:23:33', '2024-11-27 14:23:33', 1, 'dec2c42ff4e17d45c44299abe6e5d1bd54d8b231', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(164, 'Ari', 'Dorado', 'a@gmail.com', '+1', '1479852', 'Ari - Dorado', 'Canada', '$2b$10$wWeaXqP0e2cKplJPhhunCeZzpsGRMSO.MJ8NUDLmIGZDpFANnoSa.', 23, 1, 19, 'Inversionista', '2024-11-27 14:33:23', '2024-11-27 14:33:23', 1, '71c9fdd7955332dde4b798430cd5e8eba1a9b702', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(165, 'Marvin Ramirez', 'Wiley', 'vujime@mailinator.com', '+591', '+1 (631) 169-7471', 'Marvin Ramirez - Wiley', 'Cuba', '$2b$10$u8kd/4vid7xyM/D8W/KCdOAxGyt.61QLxc36M9Ow.o3NkW4bCqRBy', 20, 1, 16, 'Null', '2024-11-27 20:46:53', '2024-11-27 20:46:53', 1, '5f13150d959ecd5665c3a122c6f4de1e5bca8d17', 1, 0.00, '', 0, NULL, NULL, 'mujer', NULL, NULL, '0%'),
	(166, 'luis', 'luis', 'joryorch5000@gmail.com', '+54', '12345678', 'luis - luis', 'Argentina', '$2b$10$x0tYSekcYuTPPYaApbRW4OK3s9DfHmNWcOaKIotm2NktVAWdTj8ae', 24, 1, 18, 'Cliente', '2024-11-27 20:58:18', '2024-11-27 20:58:18', 1, '9a2e7a85a5dbf1c2c992e3a302f3d1aa78a7d8d1', 1, 0.00, '', 1, NULL, NULL, 'hombre', 'https://res.cloudinary.com/dbvzafbum/image/upload/v1732741507/clients/166.png', NULL, '100%'),
	(167, 'Cristian Andres', 'Carvajal Garcia', 'andres-carvajal-garcia64@outlook.com', '+591', '68757882', 'Cristian Andres - Carvajal Garcia', 'Bolivia', '$2b$10$olLLW68MACyzhaQ95CsZh.iffKjggMRDKl2oGLTf6a4qly6osHiYi', 26, 1, 20, 'Cliente', '2024-11-28 21:33:55', '2024-11-28 21:33:55', 1, '6d45e9730a178d6aacc587c4f77293899c11d9c7', 1, 0.00, 'admin@gmail.com', 0, NULL, NULL, 'hombre', NULL, NULL, '0%'),
	(168, 'Rodrigo', 'Gandarillas Heredia', 'rodrigo.gandarillas.heredia@gmail.com', '+591', '76993766', 'Rodrigo - Gandarillas Heredia', 'Bolivia', '$2b$10$6R.Caj3zru1NW7.uuOBpTOLLllSGYn5xcqQjk7RHp9uqu0UAR1r7a', 28, 1, 19, 'Cliente', '2024-12-11 20:34:54', '2024-12-11 20:34:54', 1, '5db5c3fab427d9f3f15696c048098fda9ef4cc17', 1, 0.00, '', 0, NULL, NULL, 'hombre', NULL, NULL, '20%'),
	(169, 'Danny', 'Gonzales Medina', 'd1303gm@gmail.com', '+591', '60746303', 'Danny - Gonzales Medina', 'Bolivia', '$2b$10$Ufm/tnQWNW39E/XS9nJqpuCArGOBbCFpUPkrOeew70zcz4MhGOVae', 26, 1, 16, 'Cliente', '2024-12-11 21:24:07', '2024-12-11 21:24:07', 1, '9076104c1597fe4b39fb8efc060db1282ffd81de', 0, 0.00, '', 0, NULL, NULL, 'hombre', NULL, NULL, '0%');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
