const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  fleetList: [{ type: ObjectId, ref: 'Fleet' }],
  truckList: [{ type: ObjectId, ref: 'Truck' }]
});

module.exports = {
  schema: userSchema,
  model: mongoose.model('User', userSchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/user/{id}",
      "relationship": "http://127.0.0.1:3000/api/user/{ownerId}/relationships/{path}"
    }
  }
};
