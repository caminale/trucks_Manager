const yahooFinance = require('yahoo-finance');
const mongoose = require('mongoose');
const request = require('request');
const {createOrUpdateStock} = require('./app/controllers/stocks');
const {City} = require('./app/models/city');

require('dotenv').config();
mongoose.Promise = require('bluebird');

mongoose.connect(process.env.DB, {useMongoClient: true});

const stocks = [
    'BNP.PA',
    'FP.PA',
    'TSLA',
    'AAPL',
    'GOOG',
    'MSFT',
    'IBM',
    'AMZN',
    'ORCL',
    'INTC',
    'QCOM',
    'FB',
    'CSCO',
    'SAP',
    'TSM',
    'BIDU',
    'HPQ',
    'TXN',
    'ERIC',
    'ASML',
    'CAJ',
];

const getValue = async symbol => {
    const stock = await yahooFinance.quote({
        symbol,
        modules: ['financialData']
    });
    console.log(stock.financialData.currentPrice);
    return stock.financialData.currentPrice;
};

const initStocks = async () => {
    console.log('init stocks');
    const valuesPromises = stocks.map(a => getValue(a));
    const results = await Promise.all(valuesPromises);
    const formattedResults = stocks.map((a, idx) => {
        return {[a]: results[idx]};
    });
    stocks.map((a, idx) => {
        createOrUpdateStock(a, results[idx]);
    });

    await initCitiesDist();

    const url = {
        headers: {
            'Connection': 'keep-alive'
        },
        uri: `${process.env.CITIES_URL}`
    };
    // await rp(url);

    // console.log(formattedResults);
};
const initCitiesDist = () => {
    City.find({})
        .then(city => {
            if (city === [] || !city || city.length === 0) {
                console.log('call cities');
                request
                    .get(`${process.env.CITIES_URL}`)
                    .on('error', function(err) {
                        console.log(err)
                    });
            }
        });
};
initStocks();

// setInterval(initStocks, 30000);

