const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stepSchema = new Schema({
    departure: {type: String, required: true},
    arrival: {type: String, required: true},
    steps: {type: Object}
});


module.exports = {
    schema: stepSchema,
    model: mongoose.model('Substep', stepSchema),
    registry: {
        urlTemplates: {
            self: `${process.env.BASE_URL}/substeps/{id}`,
            relationship: `${process.env.BASE_URL}/substeps/${process.env.SUFFIX_URL}`
        }
    }
};
