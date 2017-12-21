const bluebird = require('bluebird');
const distance = bluebird.promisifyAll(require('google-distance'));
require('dotenv').config();
const {City} = require('../models/city');
const {Distance} = require('../models/distance');

const nbElmMax = 6;
const nbChromosomes = 10;
const meterMax = 2000000;
const rapportParent = 0.6;
const maxIteration = 1000;
const penality = 1/10000;// 1 ressource pour 5 km
const marginError = 20;
const db = {
  valence: 100,
  lyon: 20,
  marseille: 50,
  bordeaux: 500,
  montpelier: 880,
  strasbourg: 999,
  brest: 25,
  nice: 70,
  hendaye: 115,
  lille: 220
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

const init = arr => {
    const chromosomes = [];
    for (let j = 0; j < nbChromosomes; j++) {
        chromosomes[j] = [];
        for (let i = 0; i < nbElmMax; i++) {
            chromosomes[j].push(arr[Math.floor((Math.random() * 100) % arr.length)]);
        }
    }
    return chromosomes;
};

const mutate = (chromosome, arr) => {
    return chromosome.map(gene => {
        if (Math.random() <= 0.3) {
            return arr[Math.floor((Math.random() * 100) % arr.length)];
        }
        return gene;
    });
};

const crossover = (child, parent) => {
    // console.log('cross');
    // console.log(parent);
    return child.map((gene, idx) => {
        if (Math.random() <= 0.3) {
            return parent[idx];
        }
        return gene;
    });
};
const score = (childs, distancesCities) => {
    let arrival = [];
    res = childs.map(a => {
        return  {
            ch: a,
            val: -Infinity,
            dist: Infinity
        }
    });
    for(let i = 0; i < childs.length; i++) {
        let ressourceByChromo = 0;
        let departure = 'Vitry-sur-Seine';
        let distanceChromo = 0;
        const childClean = cleanArray(childs[i]);
        for(let j = 0; j < childClean.length; j++) {
            arrival = childClean[j].split(',')[0];
            ressourceByChromo += Number(childClean[j].split(',')[1]);//permit to fetch only the ressources
            for(let dist in distancesCities){
              // console.log(dist);
                if(Object.prototype.hasOwnProperty.call(distancesCities, dist) && departure+arrival === dist){
                    distanceChromo += distancesCities[dist];
                    // console.log(distancesCities[dist]+' '+departure+' '+arrival+' ');
                    // console.log(dist+'--------------------------------------------------------');
                }
                //if departure+arrival is not repertoried, we have to search arrival+departure in the db
                else if(Object.prototype.hasOwnProperty.call(distancesCities, dist) && arrival+departure === dist){
                    distanceChromo += distancesCities[dist];
                    // console.log(dist+'--------------------------------------------------------');

                }
            }
            // console.log(arrival+'yolooooo------------------------------------------------'+departure)
            departure = arrival;
        }
        childs[i].push(ressourceByChromo);
        childs[i].push(distanceChromo);
        // console.log('totaldis'+distanceChromo+ ' ress'+ressourceByChromo);
    }
    calculatePenalties(childs);
    return res.map(a => a.ch);

  // console.log(childs);
};

const calculatePenalties = array => {
  for (let i = 0; i < array.length; i++) {
    if (array[i][nbElmMax+1] > meterMax) {
      array[i][nbElmMax] -= Number((array[i][nbElmMax+1]- meterMax)*penality);
    }
  }
  array.sort((a, b) => {
    if(a[nbElmMax]<b[nbElmMax]) return 1;
    if(a[nbElmMax]>b[nbElmMax]) return -1;
    return 0;
  });
  // console.log(array);
};

const selectionChromo = (arrChild, arrParent) => {
  const newArr = [];
  const selectChromoParent = Math.ceil((arrParent.length*rapportParent));
  const selectChromoChild = arrChild.length - selectChromoParent;

  for(let i = 0; i < selectChromoParent; i++) {
    newArr.push(arrParent[i]);
  }

  for(let i = 0; i < selectChromoChild; i++) {
    newArr.push(arrChild[i]);
  }
  newArr.sort((a, b) => {
    if(a[nbElmMax]<b[nbElmMax]) return 1;
    if(a[nbElmMax]>b[nbElmMax]) return -1;
    return 0;
  });
  return newArr;
};

const popArray = array => {
  let arrayCopy = array;
  if(arrayCopy.length === 0) {
    return arrayCopy;
  }
  else {
    for(let i =0; i<arrayCopy.length; i++) {
      arrayCopy[i].pop();
      arrayCopy[i].pop();

    }
    return arrayCopy
  }
};

const manageBestChromos = (arrayParent, bestChromosArray) => {
  if (bestChromosArray.length === 10) {
    bestChromosArray.reverse();
    bestChromosArray.pop();
    bestChromosArray.reverse();
    bestChromosArray.push(arrayParent[0]);
    return bestChromosArray;
  }
  else {
    bestChromosArray.push(arrayParent[0]);
    return bestChromosArray;
  }
};

const calculateAverage = bestChromos => {
  let average = 0;
  let totValue = 0;
  for(let i = 0; i < bestChromos.length; i++) {
    totValue += bestChromos[i][nbElmMax];
  }
  average = totValue / bestChromos.length;
  return average;
};

const cleanArray = array => {
  let i, j, len = array.length, out = [], obj = {};
  for (i = 0; i < len; i++) {
    obj[array[i]] = 0;
  }
  for (j in obj) {
    out.push(j);
  }
  return out;
};
const mainAlgo = async () => {
    let i = 0;
    let reformatCities = {};
    let distancesCities = {};
    let cities = await City.find({});
    await Distance.find({})
        .then(distances => {
            for(let i = 0; i < distances.length ; i++) {
                const key = distances[i].name;
                distancesCities[key] = distances[i].distance;
            }
        });
    for(let i = 0; i < process.env.nb_dist_cities; i++) {
        const key = cities[i].name;
        reformatCities[key] = cities[i].ressources;
    }
    const arr = preproc(reformatCities);
    // console.log(arr);
    let arrParrent = init(arr);
    let bestChromos = [];
    let arrParentValueDist = [];
    try {
        let arrSortChild;
        let arrSortParent;
        while(i < maxIteration) {
            if(i===0) {
            }
            else {
                arrParrent = popArray(arrParentValueDist);
            }
            let childs = arrParrent.map(chrom => mutate(chrom, arr));
            childs = childs.map((child, idx) => crossover(child, arrParrent[(idx + 1) % arrParrent.length]));
            arrSortChild = score(childs, distancesCities);
            arrSortParent = score(arrParrent, distancesCities);
            arrParentValueDist = selectionChromo(arrSortChild, arrSortParent);
            // console.log(arrParentValueDist);
            console.log(`iteration N° ${i}`);
            bestChromos = manageBestChromos(arrParentValueDist, bestChromos);
            if(-marginError < (arrParrent[1][nbElmMax] - calculateAverage(bestChromos)) && (arrParrent[1][nbElmMax] - calculateAverage(bestChromos)) < marginError && i > maxIteration/2) {
                console.log(arrParrent[1][nbElmMax] - calculateAverage(bestChromos));
                // console.log(`average triggered`);

                i = maxIteration;
            }
            i++;

        }
    } catch (err) {
        console.log(err);
    }

    // console.log(`Meilleur chemin`);
    // console.log(arrParentValueDist[0]);
    return arrParentValueDist[0];
    // console.log(arrayFull);
};
// > qsd.sort((a,c) => (a[0] < c[0]) ? -1 : 1)
// distance = distance[[ville1, ville2].sort().join('')];
// distanceChromo += parseInt([distancesCities].filter((dist) => departure+arrival === dist[0])[1]);
module.exports = {mainAlgo, nbElmMax};
