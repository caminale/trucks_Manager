const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const infoSchema = new Schema({
    latitude: String,
    longitude: String
});

const mapMarkerSchema = new Schema({
    name: String,
    lat: String,
    lng: String,
});
const markerSchema = new Schema({
    name: String,
    marker: mapMarkerSchema
});

module.exports = {
    schema: markerSchema,
    model: mongoose.model('Marker', markerSchema),
    registry: {
        urlTemplates: {
            self: `${process.env.BASE_URL}/markers/{id}`,
            relationship: `${process.env.BASE_URL}/markers/${process.env.SUFFIX_URL}`
        }
    }
};
