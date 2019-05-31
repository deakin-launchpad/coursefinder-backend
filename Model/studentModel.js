'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var studentSchema = new Schema({
  firstName: { type: String, required: true},
  gender: {type: String, enum:['MALE','FEMALE','N/A'], default:'N/A'},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  password: {type: String, required: true},
  interestedCourses: [Number] //Course Id's
 
});


module.exports = mongoose.model('student', studentSchema);
