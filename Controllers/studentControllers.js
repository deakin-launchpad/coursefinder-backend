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
      SERVICES.STUDENTSERVICE.createRecord(payloadData,function(err,data){
        if(err) cb(err)
        else {
          cb(null,data)
        }
      })
    }
  ],function(err,result){
    if(err) callback(err)
    else callback(null,result)
  })

};

module.exports = {
  registerStudent: registerStudent
};
