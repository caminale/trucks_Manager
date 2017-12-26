const mongoose = require('mongoose');
require('dotenv').config();
const {City} = require('./app/models/city');
const {createDBcities} = require('./app/controller/cities');

mongoose.connect(process.env.DB, {useMongoClient: true});


const initCities = async () => {
    //test if city is empty or not to initiate value
    await cities();
};


const cities = () => {
    City.find({})
        .then(city => {
            if (city === [] || !city || city.length === 0) {
                //permit to create cities records and launch distance api
                createDBcities();
            }
        });
};


module.exports = {initCities};