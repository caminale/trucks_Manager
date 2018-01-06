const apiRoutes = require('express').Router();
const {startAlgo} = require ('../../microservice-algogene/index');
const models = {
    User: require('../models/user').model
};

apiRoutes.post('/ia', function(req, res) {
    startAlgo("5a3a95823997521bb0263eff");
});

module.exports = apiRoutes;
