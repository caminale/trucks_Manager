const mongoose = require('mongoose');
require('dotenv').config();
const {mainAlgo} = require('./app/algo-genetique');
mongoose.connect(process.env.DB, {useMongoClient: true});

mainAlgo();