const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const fleetSchema = Schema({
  name: String,
  user: {type: ObjectId, ref: 'User'},
  truckList: [{type: ObjectId, ref: 'Truck'}]
});

module.exports = {
  schema: fleetSchema,
  model: mongoose.model('Fleet', fleetSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/fleets/{id}",
      "relationship": "http://127.0.0.1:3000/api/fleets/{ownerId}/relationships/{path}"
    }
  }
};
