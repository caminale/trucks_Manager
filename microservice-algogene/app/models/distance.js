const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const distanceSchema = new Schema({
    name: {type: String, required: true},
    distance: {type: Number}
});

const Distance = mongoose.model('Distance', distanceSchema);

module.exports = {
    Distance
};
