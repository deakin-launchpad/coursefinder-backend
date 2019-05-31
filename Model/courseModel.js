'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  name: {type: String, required: true},
  university:{ name: {type: String, required: true}, logo: {type:String}},
  contact:{ type: String},
  fees: {type: Number, required: true},
  department: {type: String, required: true},
  website: { type: String}, 
 
});


module.exports = mongoose.model('course', courseSchema);
