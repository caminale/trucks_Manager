const app = require('express')();
const API = require('json-api');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const logger = require('morgan');
require('dotenv').config();
const auth = require ('./routes/authenticate');
const available_User = require ('./routes/availableUser');

const APIError = API.types.Error;
mongoose.connect(process.env.DB, {useMongoClient: true});

const bodyParser = require("body-parser");

const models = {
    User: require('./models/user').model,
    Truck: require('./models/truck').model,
    Fleet: require('./models/fleet').model,
    City: require('./models/city').model,
    Journey: require('./models/journey').model,
    Marker: require('./models/marker').model

};

const registryTemplates = {
    users: require('./models/user').registry,
    trucks: require('./models/truck').registry,
    fleets: require('./models/fleet').registry,
    cities: require('./models/city').registry,
    journeys: require('./models/journey').registry,
    markers: require('./models/marker').registry

};

const adapter = new API.dbAdapters.Mongoose(models);
const registry = new API.ResourceTypeRegistry(registryTemplates,
    {dbAdapter: adapter});

const docs = new API.controllers.Documentation(registry, {name: 'Truck API'});
const controller = new API.controllers.API(registry);
const front = new API.httpStrategies.Express(controller, docs);

const apiReqHandler = front.apiRequest.bind(front);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
    res.header('Access-Control-Allow-Methods',
        'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//Here we are configuring express to use body-parser as middle-ware, permit to have argument sent during auth.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger('dev'));

const db = [
    'users',
    'trucks',
    'fleets',
    'cities',
    'journeys',
    'markers'
];

app.options('*', (req, res) => {
    res.send();
});

app.get('/api', front.docsRequest.bind(front));

//permit to create easily in server side user
app.get('/setup', function(req, res) {

    // create a sample user
    const user = new models.User({
        name: 'camelot',
        password: '02051995',
        admin: true

    });
    // save the sample user
    user.save(function(err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json({ success: true });
    });
});
app.post('/register', function (req, res) {
    let user =  {
        name: req.body.name,
        password: req.body.password
    };

    console.log("le user est : "+user);
    user.save(function(err) {
        if (err) throw err;

    });
});


app.route(`/api/:type(${db.join('|')})`).get(apiReqHandler).post(apiReqHandler)
    .patch(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id`).get(apiReqHandler)
    .patch(apiReqHandler)
    .delete(apiReqHandler);

app.route(`/api/:type(${db.join('|')})/:id/relationships/:relationship`)
    .get(apiReqHandler).post(apiReqHandler).patch(apiReqHandler)
    .delete(apiReqHandler);

//route defined for auth' need to be change in client in authentificator, if changed
app.use('/',auth);

//route pemit to check if a user already exist
app.use('/',available_User);


app.use((req, res) => {
    front.sendError(new APIError(404, undefined, 'Not Found'), req, res);
});


app.listen(process.env.PORT);
