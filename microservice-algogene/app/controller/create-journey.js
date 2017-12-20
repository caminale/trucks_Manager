const {Journey} = require('../models/journey');
const {createSubSteps} = require('./create-subSteps');


const  createDBjourney = async (steps, ressources, truck) => {
    // createSubSteps(steps[0],steps[steps.length-1]);
    return new Journey({
        truck: truck,
        steps: steps,
        ressources: ressources
    }).save();
};
module.exports = {createDBjourney};
