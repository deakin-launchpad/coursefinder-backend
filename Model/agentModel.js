'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrementModelID = require('./countIdModel');

var agentSchema = new Schema({
  id: { type: Number, unique: true, min: 1 },
  firstName: { type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  mobile: {type: String, required: true},
  password: {type: String, required: true},
  expertise: [{type: String, required: true}], //This should be same as the department
  interestedStudents: [Number] //Student Id's
});

agentSchema.pre('save', function (next) {
  if (!this.isNew) {
    next();
    return;
  }

  autoIncrementModelID('agents', this, next);
});

module.exports = mongoose.model('agent', agentSchema);
