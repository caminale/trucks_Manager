const cities = require("all-the-cities");
const {City} = require('../models/city');




const  createDBcities = async () => {
    let citiesFR = {};
// return 127 cities
    citiesFR = cities.filter(city => {
        if (city.country.match('FR') && city.population > 50000) {
            let position = {
                latitude: city.lat,
                longitude: city.lon
            };
            return new City({
                name: city.name,
                position: position,
                population: city.population,
                country: city.country,
                ressources: 200
            }).save();
        }
    });
};
module.exports = {createDBcities};