const app = require('express')();
const logger = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const algoGene = require('./app/routes/algoGene');

require('dotenv').config();
mongoose.connect(process.env.DB, {useMongoClient: true});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    res.header('Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//Here we are configuring express to use body-parser as middle-ware, permit to have argument sent during auth.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));


app.use('/',algoGene);


app.listen(process.env.PORT);
