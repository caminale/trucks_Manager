const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const journeySchema = Schema({
    truck: {type: ObjectId, ref: 'Truck', required: true},
    arrivalTime: {type: Date, required: true},
    destination: {type: ObjectId, ref: 'City', required: true}
});

module.exports = mongoose.model('Journey', journeySchema);