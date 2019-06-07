/**
 * Created by Vibhav
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var SUCESS = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS;
const SERVICES = require('../../DB')


const registerStudent = function (payloadData, callback) {
  var userData;

  async.series([

    function (cb) {
      userData = payloadData
      const criteria = { email: userData.email }
      SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb(ERROR.USER_ALREADY_REGISTERED)
        else cb()
      })
    },
    function (cb) {
      userData = payloadData
      userData.password = UniversalFunctions.CryptData(userData.password)
      SERVICES.STUDENTSERVICE.createRecord(userData, function (err, data) {
        if (err) cb(err)
        else {
          userData = data
          cb()
        }
      })
    }

  ], function (err, result) {
    if (err) return callback(err)
    else return callback(null, userData)
  })

};

const studentLogin = function (payloadData, callback) {
  userData = payloadData
  const criteria = { email: userData.email }
  const password = userData.password

  SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
    if (err) return callback(err)
    else if (data && data.length > 0) {
      if (UniversalFunctions.CryptData(password) !== data[0].password) return callback(ERROR.WRONG_PASSWORD)

      delete data[0].password
      return callback(null,data)
    }
    else {
      return callback(ERROR.NOT_FOUND)
    }
  })

};

const getAllStudents = function (callback) {
  const criteria = {}
  const projections = {
    'password': 0,
    '__v':0
  }
  var path="interestedCourses"
  var select=""
  var populate = {
    path:path,
    match:{},
    select:select,
    options:{lean:true}
  }

  SERVICES.STUDENTSERVICE.populatedRecords(criteria, projections,populate,{}, {}, (err, data) => {
    if (err) return callback(err)

    else if (data && data.length > 0) return callback(null, data)

    else return callback(ERROR.USER_NOT_FOUND)
  })
}

const getStudent = function (payloadData, callback) {
  var userData = payloadData
  const criteria = { _id: payloadData }
  const projections = {
    'password': 0,
    '__v': 0
  }
  var path="interestedCourses"
  var select=""
  var populate = {
    path:path,
    match:{},
    select:select,
    options:{lean:true}
  }
  SERVICES.STUDENTSERVICE.populatedRecords(criteria, projections,populate,{}, {}, (err, data) => {
    if (err) return callback(err)

    else if (data && data.length > 0) return callback(null, data)

    else return callback(ERROR.USER_NOT_FOUND)
  })
}


const updateStudent = function(payloadData, callback){
  var userData;
  async.series([

    function (cb) {
      userData = payloadData
      const criteria = { email: userData.email }
      SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.USER_NOT_FOUND)
      })
    },
    function (cb) {
      userData = payloadData
      const criteria = {_id: payloadData.id}
      
      SERVICES.STUDENTSERVICE.updateRecord(criteria, userData, function (err, data) {
        if (err) cb(err)
        else {
          userData = data
          cb()
        }
      })
    }

  ], function (err, result) {
    if (err) return callback(err)
    else return callback(null, userData)
  })
}

const updateInterestedCourseStatus = function(id,payloadData, callback){
  let userData = payloadData;
  console.log('[USER DATA]', id)
  async.series([
    function (cb) {
      const criteria = { _id: id }
      SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.USER_NOT_FOUND)
      })
    },
    function (cb) {
      const criteria = { _id:  userData.interestedCourses }
      SERVICES.COURSESERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.NOT_FOUND)
      })
    },
    function (cb) {
      const criteria = {_id: id}
      SERVICES.STUDENTSERVICE.updateRecord(criteria, { $push: { applicationStatus: {courseid:userData.interestedCourses, status:userData.status} } }, function (err, data) {
        if (err) cb(err)
        else {
          userData = data
          cb()
        }
      })
    }
  ], function (err, result) {
    if (err) return callback(err)
    else return callback(null, userData)
  })
}


const updateStudentCourseinterests = function(id,payloadData, callback){
  let userData = payloadData;
  console.log('[USER DATA]', id)
  async.series([
    function (cb) {
      const criteria = { _id: id }
      SERVICES.STUDENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.USER_NOT_FOUND)
      })
    },
    function (cb) {
      const criteria = { _id:  userData.interestedCourses }
      SERVICES.COURSESERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.NOT_FOUND)
      })
    },
    function (cb) {
      const criteria = {_id: id}
      SERVICES.STUDENTSERVICE.updateRecord(criteria, { $push: { interestedCourses: userData.interestedCourses } }, function (err, data) {
        if (err) cb(err)
        else {
          userData = data
          cb()
        }
      })
    }
  ], function (err, result) {
    if (err) return callback(err)
    else return callback(null, userData)
  })
}


module.exports = {
  registerStudent: registerStudent,
  studentLogin: studentLogin,
  getAllStudents: getAllStudents,
  getStudent: getStudent,
  updateStudent: updateStudent,
  updateStudentCourseinterests: updateStudentCourseinterests,
  updateInterestedCourseStatus: updateInterestedCourseStatus
};
