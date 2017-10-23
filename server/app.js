const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//import all of the routes
const index = require('./routes/index');
const users = require('./routes/users');
const cities = require('./routes/cities');
const trucks = require('./routes/trucks');

const app = express();

//connection to the database with promise
mongoose.connect('mongodb://localhost/truck_api')
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// à revoir le node-restful le git : https://github.com/baugarten/node-restful
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//chargez le module de routage dans l’application
app.use('/', index);
app.use('/users', users);
app.use('/cities', cities);
app.use('/trucks', trucks);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
