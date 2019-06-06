'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UniversalFunctions = require('../Utils/UniversalFunctions');
const APPLICATION_STATUS = UniversalFunctions.CONFIG.APP_CONSTANTS.DATABASE.APPLICATION_STATUS

var applicationSchema = new Schema({
    studentId:{type:Schema.ObjectId, ref:'student'}, 
    courseId:{type:Schema.ObjectId, ref:'course'}, 
    status:[{status:{type: String, enum:[
        APPLICATION_STATUS.STARTED, APPLICATION_STATUS.SUBMITTED, APPLICATION_STATUS.UNDERREVIEW, APPLICATION_STATUS.DONE
    ]},submittedon:{type: Date, default: Date.now()}}]
});


module.exports = mongoose.model('application', applicationSchema);
