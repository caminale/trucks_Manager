const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    name: {type: String, required: true, trim: true, unique: true},
    admin: Boolean,
    password: {type: String, required: false, trim: true},
    fleetList: [{type: ObjectId, ref: 'Fleet'}],
    trucks: [{type: String}]
});

module.exports = {
    schema: userSchema,
    model: mongoose.model('User', userSchema),
    registry: {
        urlTemplates: {
            self: `${process.env.BASE_URL}/user/{id}`,
            relationship: `${process.env.BASE_URL}/user/${process.env.SUFFIX_URL}`
        }
    }
};