const cities = require("all-the-cities");
const {City} = require('../models/city');
const {Stock} = require('../models/stocks');
const {main} = require('./distances');
const {Distance} = require('../models/distance');

require('dotenv').config();

const distances = () => {
    Distance.find({})
        .then(distances => {
            if (distances === [] || !distances || distances.length === 0) {
                main();
            }
        });
};


const  createDBcities = async () => {
// return 127 cities
    await cities.filter(city => {
        if (city.country.match('FR') && city.population > process.env.POPULATION) {
            let position = {
                latitude: city.lat,
                longitude: city.lon
            };
            Stock.find({})
                .then(stocks => {
                    const x = Math.floor((Math.random() * stocks.length) + 1);
                    return new City({
                        name: city.name,
                        position: position,
                        population: city.population,
                        country: city.country,
                        ressources: stocks[x].value
                    }).save();
                });
        }
    });
    distances();

};
module.exports = {createDBcities};

