const {Journey} = require('../models/journey');
const {createSubSteps} = require('./create-subSteps');
const {SubSteps} = require('../models/subSteps');


const  createDBjourney = async (steps, ressources, truck) => {
    console.log("init steps");
    manageSubSteps(steps);
    return new Journey({
        truck: truck,
        steps: steps,
        ressources: ressources
    } ).save();
};
const manageSubSteps = async (steps) => {
    const subSteps = await SubSteps.find({});
    const journeys = await Journey.find({});
    if (subSteps === [] || !subSteps || subSteps.length === 0) {
        for( let i = 0; i < steps.length -1; i++) {
            if ( i+1 <= steps.length -1)
            await createSubSteps(steps[i],steps[i+1]);
        }
    }
    else {
        const departure = journeys[journeys.length-2].steps[steps.length-1];
        // console.log(journeys.length+"   "+steps.length+"depart  : "+departure+"arrival :  "+steps[0]);
        //permit to make substeb between each steps
        await createSubSteps(departure,steps[0]);
        for( let i = 0; i < steps.length -1; i++) {
            if ( i+1 <= steps.length -1)
                await createSubSteps(steps[i],steps[i+1]);
        }
    }
};
module.exports = {createDBjourney};
