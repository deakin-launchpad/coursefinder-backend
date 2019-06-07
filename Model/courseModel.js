'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courseSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  university:{ name: {type: String, required: true}, logo: {type:String}, location: {type: String, required: true}},
  contact:{ type: String},
  courseLevel: {type: String, required: true},
  fees: {type: Number, required: true},
  department: {type: String, required: true},
  website: { type: String} 
});
module.exports = mongoose.model('course', courseSchema);
