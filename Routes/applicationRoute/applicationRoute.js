/**
 * Created by Vibhav on 31/05/2019.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const APPLICATIONSTATUSAPI = '/api/v1/'


var createApplication = {
  method: "POST",
  path: APPLICATIONSTATUSAPI+"create/application/",
  config: {
    description: "Update Application API",
    tags: ["api", "application"],
    handler: function(request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.ApplicationController.createApplication(userData, function(
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      payload: {
        studentId: Joi.string().required(), 
        courseId: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};


var getAllApplications = {
  method: "GET",
  path: APPLICATIONSTATUSAPI+"getallapplications/",
  config: {
    description: "Get Application API",
    tags: ["api", "application"],
    handler: function(request, h) {
      let payloadData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.ApplicationController.getAllApplication(payloadData,function(
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var getApplication = {
  method: "GET",
  path: APPLICATIONSTATUSAPI+"getapplication/{id}",
  config: {
    description: "Get Application API",
    tags: ["api", "application"],
    handler: function(request, h) {
      var userData = request.params.id
      return new Promise((resolve, reject) => {
        Controller.ApplicationController.getApplication(userData,function(
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      params: {
        id: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var updateApplication = {
  method: "PUT",
  path: APPLICATIONSTATUSAPI+"update/application/",
  config: {
    description: "Update Application API",
    tags: ["api", "application"],
    handler: function(request, h) {
      var userData = request.payload;
      console.log('[ROUTE]',userData)
      return new Promise((resolve, reject) => {
        Controller.ApplicationController.updateApplication(userData, function(
          err,
          data
        ) {
          if (err) reject(UniversalFunctions.sendError(err));
          else
            resolve(
              UniversalFunctions.sendSuccess(
                Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT,
                data
              )
            );
        });
      });
    },
    validate: {
      payload: {
        studentId: Joi.string().required(), 
        courseId: Joi.string().required(), 
        status: Joi.string().required()
      },
      failAction: UniversalFunctions.failActionFunction
    },
    plugins: {
      "hapi-swagger": {
        responseMessages:
          UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
      }
    }
  }
};

var ApplicationRoutes = [createApplication, getAllApplications, updateApplication,getApplication];
module.exports = ApplicationRoutes;
