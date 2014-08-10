'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TreeSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Tree', TreeSchema);