var createErrors = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var imanesRouter = require('./routes/imanes');//importando ruta

var app = express();

//conecxion
require('./config/databases');
/*
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/api/Imanes', {
    useNewUrlParser: true
})
.then(() => console.log('conecction succesfull'))
.catch((err) => console.log(err));
*/

//seteando motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/imanes', imanesRouter);

//404 error handler
app.use(function(req, res, next) {
    next(createErrors(404));
});

//error handler
app.use(function(err, req, res, next){
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err:{};
    res.status(err.status || 500);
    res.render('error');//renderisqando pagina de error
});


app.listen(app.get('port'), () => {
    console.log('RestFul running on https://localhots:3000/');
});

module.exports = app;
