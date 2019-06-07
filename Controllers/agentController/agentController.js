/**
 * Created by Vibhav
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var SUCESS = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS;
const SERVICES = require('../../DB')


var registerAgent = function (payloadData, callback) {
  var userData;

  async.series([

    function (cb) {
      userData = payloadData
      const criteria = { email: userData.email }
      SERVICES.AGENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb(ERROR.USER_ALREADY_REGISTERED)
        else cb()
      })
    },
    function (cb) {
      userData = payloadData
      userData.password = UniversalFunctions.CryptData(userData.password)
      SERVICES.AGENTSERVICE.createRecord(payloadData, function (err, data) {
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

var agentLogin = function (payloadData, callback) {
  userData = payloadData
  const criteria = { email: userData.email }
  const password = userData.password

  SERVICES.AGENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
    console.log(data)
    if (err) return callback(err)
    else if (data && data.length > 0) {
      if (UniversalFunctions.CryptData(password) !== data[0].password) return callback(ERROR.WRONG_PASSWORD)

      return callback(null, SUCESS.DEFAULT)
    }
    else {
      return callback(ERROR.NOT_FOUND)
    }
  })

};

const getAllAgents = function (callback) {
  const criteria = {}
  const projections = {
    'password': 0,
    '__v': 0
  }
  var path = "interestedStudents"
  var select = ""
  var populate = {
    path: path,
    match: {},
    select: select,
    options: { lean: true }
  }

  SERVICES.AGENTSERVICE.populatedRecords(criteria, projections, populate, {}, {}, (err, data) => {
    if (err) return callback(err)

    else if (data && data.length > 0) return callback(null, data)

    else return callback(ERROR.USER_NOT_FOUND)
  })
}

const getAgent = function (payloadData, callback) {
  var userData = payloadData
  const criteria = { _id: payloadData }
  const projections = {
    'password': 0,
    '__v': 0
  }

  var path = "interestedStudents"
  var select = ""
  var populate = {
    path: path,
    match: {},
    select: select,
    options: { lean: true }
  }

  SERVICES.AGENTSERVICE.populatedRecords(criteria, projections, populate, {}, {}, (err, data) => {
    if (err) return callback(err)

    else if (data && data.length > 0) return callback(null, data)

    else return callback(ERROR.USER_NOT_FOUND)
  })
}


const updateAgent = function (payloadData, callback) {
  var userData;
  async.series([

    function (cb) {
      userData = payloadData
      const criteria = { email: userData.email }
      SERVICES.AGENTSERVICE.getRecord(criteria, {}, {}, (err, data) => {
        if (err) cb(err)
        else if (data && data.length > 0) cb()
        else cb(ERROR.USER_NOT_FOUND)
      })
    },
    function (cb) {
      userData = payloadData
      const criteria = { _id: payloadData.id }

      SERVICES.AGENTSERVICE.updateRecord(criteria, userData, function (err, data) {
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
  registerAgent: registerAgent,
  agentLogin: agentLogin,
  getAgent: getAgent,
  getAllAgents: getAllAgents,
  updateAgent: updateAgent
};
