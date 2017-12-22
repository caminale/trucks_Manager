const bluebird = require('bluebird');
const distance = bluebird.promisifyAll(require('google-distance'));
require('dotenv').config();
distance.apiKey = process.env.API_KEY_GOOGLE;


const {City} = require('../models/city');
const {Distance} = require('../models/distance');

const distanceAPI = (departure, arrival) => {
    return distance.getAsync({
        origin: `${departure}, France`,
        destination: `${arrival}, France`
    });
};

const distanceCities = async arr => {
    const arrToSort = [...arr];
    const distances = [];
    for (let i = 0; i < arrToSort.length - 1; i++) {
        for (let j = i+1; j < arrToSort.length; j++) {
            const dist = (await distanceAPI(arrToSort[i][0],arrToSort[j][0])).distanceValue;
            console.log(`${arrToSort[i][0]}${arrToSort[j][0]}`);
            try {
                distances.push({
                    name: `${arrToSort[i][0]}${arrToSort[j][0]}`,
                    distance: dist
                });
            }catch(err) {

            }
        }
    }
    return distances;
};
const preproc = (db) => {
    const arr = [];
    for (const key in db) {
        if (Object.prototype.hasOwnProperty.call(db, key)) {
            arr.push([key, db[key]]);
        }
    }
    return arr;
};

const main = async () => {
    let reformatCities = {};
    let cities = await City.find({});
    for (let i = 0; i < process.env.nb_dist_cities; i++) {
        const key = cities[i].name;
        reformatCities[key] = cities[i].ressources;
    };
    const arr = preproc(reformatCities);
    const distancesCities = await distanceCities(arr);
    distancesCities.map(dist => {
        return new Distance({
            name: dist.name,
            distance: dist.distance
        }).save();
    });

};
module.exports = {main};
