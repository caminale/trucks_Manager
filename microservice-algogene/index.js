const mongoose = require('mongoose');
require('dotenv').config();
const {mainAlgo} = require('./app/controller/algo-genetique');
const {createDBjourney} = require('./app/controller/create-journey');

mongoose.connect(process.env.DB, {useMongoClient: true});

const startAlgo = async (trucks) => {
  let journey = await mainAlgo();
  let steps = [];
  let ressources = [];
  for(let i = 0; i < journey.length - 2; i++) {
    steps.push(journey[i][0]);
    ressources.push(journey[i][1]);
  }
  createDBjourney(steps, ressources, trucks);
};
module.exports = {startAlgo};