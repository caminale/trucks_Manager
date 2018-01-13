const apiRoutes = require('express').Router();
const rp = require('request-promise');

const models = {
    User: require('../models/user').model
};

apiRoutes.post('/ia', function(req, res) {
    const truck = '5a3a95823997521bb0263eff';
    const url = `${process.env.ALGOGENE_URL}${truck}`;
    rp(url);
});

module.exports = apiRoutes;
