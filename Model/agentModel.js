'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var agentSchema = new Schema({
  firstName: { type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  password: {type: String, required: true},
  expertise: [{type: String, required: true}], //This should be same as the department
  interestedStudents: [Number] //Student Id's
});


module.exports = mongoose.model('agent', agentSchema);
