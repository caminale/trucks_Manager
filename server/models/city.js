const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const citySchema = Schema({
  name: {type: String, required: true},
  resources: {type: Number, default: 0}
});

module.exports = {
  schema: citySchema,
  model: mongoose.model('City', citySchema),
  registry: {
    urlTemplates: {
      "self": "http://127.0.0.1:3000/api/cities/{id}",
      "relationship": "http://127.0.0.1:3000/api/cities/{ownerId}/relationships/{path}"
    }
  }
};
