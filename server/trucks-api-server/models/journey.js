const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const journeySchema = new Schema({
  truck: {type: ObjectId, ref: 'Truck', required: true},
  steps: [{type: String}],
  substeps: [{type: String}],
  ressources: [{type: Number}]
});

module.exports = {
  schema: journeySchema,
  model: mongoose.model('Journey', journeySchema),
  registry: {
    urlTemplates: {
      self: `${process.env.BASE_URL}/journeys/{id}`,
      relationship: `${process.env.BASE_URL}/journeys/${process.env.SUFFIX_URL}`
    }
  }
};
