
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

  const getAllCourses = function (callback) {
    var courseData;
    const criteria = {}
    const projection = {}
    SERVICES.COURSESERVICE.getRecord(criteria, projection, {}, function (err, data) {
        if (err) return callback(err)
        else if(data && data.length > 0){
          courseData = data
            return callback(null, courseData)
      }
      else return callback(null, ERROR.DEFAULT)
    }) 
  
  };

  const getCourse = function (payloadData, callback) {
    var courseData;
    const criteria = {_id: payloadData}
    const projection = {
      '__v':0
    }
    SERVICES.COURSESERVICE.getRecord(criteria, projection, {}, function (err, data) {
        if (err) return callback(err)
        else if(data && data.length > 0){
          courseData = data
            return callback(null, courseData)
      }
      else return callback(null, ERROR.DEFAULT)
    }) 
  
  };


  const updateCourse = function (payloadData, callback) {
    var courseData;
    const criteria = {_id: payloadData.id}
    courseData = payloadData
    async.series([
      function(cb){
        SERVICES.COURSESERVICE.getRecord(criteria, projection, {}, function (err, data) {
          if (err) return cb(err)
          else if(data && data.length > 0){
            courseData = data
              return cb(null, courseData)
        }
        else return cb(null, ERROR.DEFAULT)
      }) 
      },
      function(cb){
        SERVICES.COURSESERVICE.updateRecord(criteria, courseData,function (err, data) {
          if (err) return cb(err)
          else {
              courseData = data
              return cb(null, courseData)
        }
      }) 
      }
    ], function (err, result) {
      if (err) return callback(err)
      else return callback(null, userData)
    })  
  };

  module.exports = {
    insertCourse: insertCourse,
    getAllCourses: getAllCourses,
    updateCourse: updateCourse,
    getCourse: getCourse
  };
  