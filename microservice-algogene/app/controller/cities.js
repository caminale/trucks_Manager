const cities = require("all-the-cities");
const {City} = require('../models/city');
const {Stock} = require('../models/stocks');




const  createDBcities = async () => {
    let citiesFR = {};
// return 127 cities
    citiesFR = cities.filter(city => {
        if (city.country.match('FR') && city.population > 50000) {
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
};
module.exports = {createDBcities};

