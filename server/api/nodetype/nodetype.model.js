'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NodetypeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Nodetype', NodetypeSchema);