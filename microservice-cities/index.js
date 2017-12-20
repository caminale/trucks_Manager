const mongoose = require('mongoose');
require('dotenv').config();

const {City} = require('./app/models/city');
const {Distance} = require('./app/models/distance');

const {createDBcities} = require('./app/controller/cities');
const {main} = require('./app/controller/distances');

mongoose.connect(process.env.DB, {useMongoClient: true});


//test if city is empty or not to initiate value
City.find({})
    .then(city => {
        if (city === [] || !city || city.length === 0) {
            createDBcities();
        }
    });
Distance.find({})
    .then(distances => {
        if (distances === [] || !distances || distances.length === 0) {
            main();
        }
    });
