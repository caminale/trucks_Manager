const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stepSchema = new Schema({
    departure: {type: String, required: true},
    arrival: {type: String, required: true},
    steps: {type: Object}
});

const SubSteps = mongoose.model('SubStep', stepSchema);

module.exports = {
    SubSteps
};
