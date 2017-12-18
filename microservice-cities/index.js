const mongoose = require('mongoose');
require('dotenv').config();
const {City} = require('./app/models/city');
const {createDBcities} = require('./app/controller/cities');

mongoose.connect(process.env.DB, {useMongoClient: true});


//test if city is empty or not to initiate value
City.find({})
    .then(city => {
        if (city === [] || !city || city.length === 0) {
            createDBcities();
        }
    });
