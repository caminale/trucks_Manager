const mongoose = require('mongoose');
const {Journey} = require('../models/journey');
require('dotenv').config();


const  createDBjourney = async (steps, ressources, truck) => {
          return new Journey({
            truck: truck,
            steps: steps,
            ressources: ressources
          }).save();
    };
module.exports = {createDBjourney};
