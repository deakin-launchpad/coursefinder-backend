'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrementModelID = require('./countIdModel');

var studentSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  firstName: { type: String, required: true},
  gender: {type: String, enum:['MALE','FEMALE','N/A'], default:'N/A'},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  password: {type: String, required: true},
  interestedCourses: [Number] //Course Id's
 
});

studentSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('students', this, next);
});

module.exports = mongoose.model('student', studentSchema);
