const {SubSteps} = require('../models/subSteps');
var rp = require('request-promise');
require('dotenv').config();


const  createSubSteps =  (departure, arrival) => {
    const url = `${process.env.URL}origin=${departure}&destination=${arrival}&key=${process.env.API_KEY_GOOGLE}`;
    rp(url)
        .then(function (data) {
            const steps = JSON.parse(data).routes[0].legs[0].steps;
            // console.log(steps)
            return new SubSteps({
                departure: departure,
                arrival: arrival,
                steps: steps
            }).save();
        })
        .catch(function (err) {
            console.log(err) ;
        });

};
module.exports = {createSubSteps};
