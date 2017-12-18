const mongoose = require('mongoose');
require('dotenv').config();
const {mainAlgo} = require('./app/controller/algo-genetique');
const {City} = require('./app/models/city');

mongoose.connect(process.env.DB, {useMongoClient: true});

mainAlgo();
