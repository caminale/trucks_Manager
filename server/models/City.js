const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = Schema({
    name: {type: String, required: true},
    resources: {type: Number, default: 0}
});

module.exports = mongoose.model('City', citySchema);