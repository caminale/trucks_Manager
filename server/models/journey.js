const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const journeySchema = Schema({
  truck: {type: ObjectId, ref: 'Truck', required: true},
  arrivalTime: {type: Date, required: true},
  destination: {type: ObjectId, ref: 'City', required: true}
});

module.exports = {
  schema: journeySchema,
  model: mongoose.model('Journey', journeySchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/journeys/{id}",
      "relationship": "http://127.0.0.1:3000/api/journeys/{ownerId}/relationships/{path}"
    }
  }
};
