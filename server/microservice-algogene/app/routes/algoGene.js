const apiRoutes = require('express').Router();
const {mainAlgo} = require('../controller/algo-genetique');
const {createDBjourney} = require('../controller/create-journey');

apiRoutes.get('/algoGene', async function(req, res) {

        const trucks = req.query.truck;
        console.log(trucks);
        let journey = await mainAlgo();
        let steps = [];
        let ressources = [];
        for(let i = 0; i < journey.length - 2; i++) {
            steps.push(journey[i][0]);
            ressources.push(journey[i][1]);
        }
        createDBjourney(steps, ressources, trucks);
});

module.exports = apiRoutes;
