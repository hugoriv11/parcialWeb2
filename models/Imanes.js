const mongoose = require('mongoose');
const {Schema} = mongoose;

const imanSchema = new Schema({
    id:{},
    forma:{},
    color:{},
    intensidad:{}
});

module.exports = mongoose.model('iman', imanSchema);// en collection, mongo agrega una s => imans