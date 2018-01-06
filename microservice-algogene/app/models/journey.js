const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const journeySchema = new Schema({
  truck: {type: ObjectId, ref: 'Truck', required: true},
  steps: [{type: String}],
  ressources: [{type: Number}]
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = {
  Journey
};
