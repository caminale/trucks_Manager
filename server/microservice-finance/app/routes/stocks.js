const apiRoutes = require('express').Router();
const {createOrUpdateStock} = require('../controllers/stocks');
const rp = require('request-promise');
const yahooFinance = require('yahoo-finance');


apiRoutes.get('/stocks', async function(req, res) {
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
        return stock.financialData.currentPrice;
    };

    const initStocks = async () => {
        const valuesPromises = stocks.map(a => getValue(a));
        const results = await Promise.all(valuesPromises);
        const formattedResults = stocks.map((a, idx) => {
            return {[a]: results[idx]};
        });
        stocks.map((a, idx) => {
            createOrUpdateStock(a, results[idx]);
        });
        // console.log(formattedResults);
    };
    //init cities
    const url = `${process.env.CITIES_URL}`;
    rp(url);
    setInterval(initStocks, 1000);

});

module.exports = apiRoutes;

