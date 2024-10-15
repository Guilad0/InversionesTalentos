var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fileUpload = require('express-fileupload')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var postsRouter = require('./routes/posts');
var categoria_postsRouter = require('./routes/categoria_posts');
var logrosRouter = require('./routes/logros');
var categoriesRouter = require('./routes/categories')
var linksRouter = require('./routes/links');
var faqRouter = require('./routes/faq');
var authRouter = require('./routes/auth');

var app = express();

app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    createParentPath:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter); 
app.use('/users', usersRouter);
app.use('/contact', contactRouter);
app.use('/posts', postsRouter);
app.use('/categoria_posts', categoria_postsRouter);
app.use('/logros', logrosRouter);
app.use('/categories',categoriesRouter )
app.use('/links', linksRouter); 
app.use('/faq', faqRouter);
app.use('/auth', authRouter);

module.exports = app;
