const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const truckSchema = Schema({
  user: {type: ObjectId, ref: 'User'},
  maxPayload: {type: Number, required: true, default: 0},
  isDelivering: {type: Boolean, required: true, default: false},
  currentTown: {type: ObjectId, ref: 'City', required: true},
  fleetList: [{type: ObjectId, ref: 'Fleet'}]
});

module.exports = {
  schema: truckSchema,
  model: mongoose.model('Truck', truckSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/trucks/{id}",
      "relationship": "http://127.0.0.1:3000/api/trucks/{ownerId}/relationships/{path}"
    }
  }
};
