const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const fleetSchema = Schema({
    name: String,
    user: {type: ObjectId, ref: 'User'},
    truckList: [{type: ObjectId, ref: 'Truck'}]
});

module.exports = mongoose.model('Fleet', fleetSchema);