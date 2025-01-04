import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cron from 'node-cron';
import { checkInvestmentRequest } from './helpers/nodeCron.js';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import clientsRouter from './routes/clients.js';
import contactRouter from './routes/contact.js';
import postsRouter from './routes/posts.js';
import categoria_postsRouter from './routes/categoria_posts.js';
import logrosRouter from './routes/logros.js';
import categoriesRouter from './routes/categories.js';
import linksRouter from './routes/links.js';
import faqRouter from './routes/faq.js';
import { routerAuth } from './routes/auth.js';
import ajustesRouter from './routes/ajustes.js';
import movimientosRouter from './routes/movimientos.js';
import experienciaRoutes from './routes/experiencia.js';
import solicitudesRoutes from './routes/solicitudes_retiro.js';
import billeteraRoutes from './routes/billetera.js';
import inversionesRetirosRoutes from './routes/inversionesRetiros.js';
import ajustesAdminRouter from './routes/ajustesAdmin.js';
import rolesRouter from './routes/roles.js';
import comentariosRouter from './routes/comentarios.js';
import utilitiesRouter from './routes/utilities.js';
import reportesRouter from './routes/reportes.js';
import reporteReversionRouter from './routes/reporteReversion.js';
import reportRouter from './routes/report.js';
import perfilRouter from './routes/perfil.js';
import informacionRoutes from './routes/informacionRoutes.js';
import previewRouter from './routes/preview.js';
import solicitudesInversionRouter from './routes/solicitudesInversion.js';
import reporteSolicitudesInversionRouter from './routes/reporteSolicitudesInversion.js';


var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  createParentPath: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Para leer JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para leer datos urlencoded
app.use('/uploads/categories', express.static(path.join(__dirname, 'uploads/categories')));
app.use('/uploads/videos', express.static(path.join(__dirname, 'uploads/videos')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/clients', clientsRouter);
app.use('/contact', contactRouter);
app.use('/posts', postsRouter);
app.use('/categoria_posts', categoria_postsRouter);
app.use('/logros', logrosRouter);
app.use('/categories', categoriesRouter)
app.use('/links', linksRouter);
app.use('/faq', faqRouter);
app.use('/auth', routerAuth);
app.use('/ajustes', ajustesRouter);
app.use('/movimientos', movimientosRouter);
app.use('/experiencia', experienciaRoutes);
app.use('/solicitudes', solicitudesRoutes);
app.use('/billetera', billeteraRoutes);
app.use('/inversionesRetiros', inversionesRetirosRoutes);
app.use('/ajustesAdmin', ajustesAdminRouter);
app.use('/api/experiencia', experienciaRoutes);
app.use('/roles', rolesRouter);
app.use('/comentarios', comentariosRouter);
app.use('/utilities', utilitiesRouter);
app.use('/reportes', reportesRouter);
app.use('/reporteReversion', reporteReversionRouter);
app.use('/report', reportRouter);
app.use('/perfil', perfilRouter);
app.use('/informacion', informacionRoutes);
app.use('/preview', previewRouter);
app.use('/solicitudesInversion', solicitudesInversionRouter);
app.use('/reporteSolicitudesInversion', reporteSolicitudesInversionRouter);

// se activa a las 23:50 cada dia
cron.schedule('50 23 * * *', checkInvestmentRequest);


export default app; 