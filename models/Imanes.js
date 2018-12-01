const mongoose = require('mongoose');
const {Schema} = mongoose;

const imanSchema = new Schema({
    forma:{type: String, required: true},
    color:{type: String, required: true},
    intensidad:{type: String, required: true}
});

module.exports = mongoose.model('iman', imanSchema);// en collection, mongo agrega una s => imans