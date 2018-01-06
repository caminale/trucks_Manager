const {SubSteps} = require('../models/subSteps');
var rp = require('request-promise');
require('dotenv').config();


const  createSubSteps = async (departure, arrival) => {
    const departureUrl = encodeURI(departure);
    const arrivalUrl = encodeURI(arrival);

    const url = `${process.env.URL}origin=${departureUrl}&destination=${arrivalUrl}&region=fr&key=${process.env.API_KEY_GOOGLE}`;
    const data = await rp(url);
    try {
        const steps = JSON.parse(data).routes[0].legs[0].steps;
        // console.log(steps)
        return new SubSteps({
            departure: departure,
            arrival: arrival,
            steps: steps
        }).save();
    }catch (err) {
        console.log(err);
    }
};
module.exports = {createSubSteps};
