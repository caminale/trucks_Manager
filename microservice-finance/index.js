const yahooFinance = require('yahoo-finance');
const mongoose = require('mongoose');
const rp = require('request-promise');
const {createOrUpdateStock} = require('./app/controllers/stocks');
const {initCities} = require('../microservice-cities/index');

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
    console.log(stock.financialData.currentPrice)
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
    const url = `${process.env.CITIES_URL}`;
    rp(url);

    // console.log(formattedResults);
};

initStocks();

setInterval(initStocks, 30000);

