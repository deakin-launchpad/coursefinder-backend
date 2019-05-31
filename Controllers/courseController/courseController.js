
/**
 * Created by Vibhav
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var SUCESS = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS;
const SERVICES = require('../../DB')

const insertCourse = function (payloadData, callback) {
    var courseData;
  
    courseData = payloadData
    SERVICES.COURSESERVICE.createRecord(courseData, function (err, data) {
        if (err) return callback(err)
        else {
            courseData = data
            return callback(null, courseData)
      }
    }) 
  
  };

  module.exports = {
    insertCourse: insertCourse
  };
  