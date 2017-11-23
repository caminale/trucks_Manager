const apiRoutes = require('express').Router();
const jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

const models = {
    User: require('../models/user').model
};

// route to authenticate a user (POST http://localhost:8080/authenticate)
apiRoutes.post('/auth', function(req, res) {
    //search the user in function of the username entered
    models.User.findOne({
        name: req.body.username
    }, function(err, user) {
        if (err) throw err;
        //if user is undefined
        if (!user) {
            res.status(400).send({error: 'wrong username'});
        } else if (user) {
            // check if password matches
            if (user.password != req.body.password) {
                res.status(400).send({error: 'Wrong credentials'});
            } else {
                // if user is found and password is right
                // create a token with only our given payload
                // we don't want to pass in the entire user since that has the password
                const payload = {
                    admin: user.admin
                };

                let token =jwt.sign(payload, "jwt_secret");

                // return the information including token as JSON
                res.status(200).send({"access_token": token, "user_id":user._id});
            }
        }
    });
});

module.exports = apiRoutes;
