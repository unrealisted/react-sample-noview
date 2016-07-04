var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

mongoose.connect('mongodb://dbfromozon:qazWSXedc123@ds023550.mlab.com:23550/dbfromozon');

var BaseShema = new Schema({

},{collection: "ozon"});

module.exports = mongoose.model('Base', BaseShema);