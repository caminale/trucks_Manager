const {City} = require('../models/city');
const {createDBcities} = require('../controller/cities');
const apiRoutes = require('express').Router();


apiRoutes.get('/initCities', async function(req, res) {
        City.find({})
            .then(city => {
                if (city === [] || !city || city.length === 0) {
                    //permit to create cities records and launch distance api
                    createDBcities();
                }
            });
});

module.exports = apiRoutes;

