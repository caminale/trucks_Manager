const apiRoutes = require('express').Router();
const JSON = require('circular-json');
const models = {
    User: require('../models/user').model
};

// route to check is a user is available (POST http://localhost:8080/authenticate)
apiRoutes.post('/availableUser', function(req, res) {
    //search the user in function of the username entered

    models.User.findOne({
        name: req.body.name
    }, function(err, user) {
        console.log(JSON.stringify(user));

        if (err) throw err;
        //if user is undefined
        if (!user) {
            res.status(200).send({result: 'okUserNotExisting'});
        } else{
                res.status(200).send({result: 'duplicate email'});
            }
    });
});

module.exports = apiRoutes;
