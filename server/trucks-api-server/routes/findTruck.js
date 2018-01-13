const apiRoutes = require('express').Router();
const JSON = require('circular-json');
const models = {
  Truck: require('../models/truck').model
};

// route to check is a user is available (POST http://localhost:8080/authenticate)
apiRoutes.post('/findTruck', function(req, res) {
  //search the user in function of the username entered


  models.Truck.findOne({
    name: req.body.name,
    user: req.body.user
  }, function(err, truck) {
    console.log(JSON.stringify(truck));

    if (err) throw err;
    //if user is undefined
    if (truck) {
      res.send(JSON.stringify(truck));
    }
  });
});

module.exports = apiRoutes;
