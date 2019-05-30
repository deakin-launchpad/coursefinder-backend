/**
 * Created by Navit
 */
var UniversalFunctions = require('../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
const SERVICES = require('../DB')
var registerStudent = function(payloadData, callback) {
  var userData;
  async.series([
    function(cb){
      userData = payloadData
      SERVICES.STUDENTSERVICE.createRecord(payloadData,function(err,data){
        if(err) cb(err)
        else {
          userData = data
          cb()
        }
      })
    }
  ],function(err,result){
    if(err) return callback(err)
    else return callback(null,userData)
  })

};

module.exports = {
  registerStudent: registerStudent
};
