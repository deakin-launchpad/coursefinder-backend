/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const STUDENTAPI = '/api/agent/v1/'
var registerAgent = {
  method: "POST",
  path: STUDENTAPI+"register",
  config: {
    description: "Register agent API",
    tags: ["api", "agent"],
    handler: function (request, h) {
      var payloadData = request.payload;
      if (!UniversalFunctions.verifyEmailFormat(payloadData.email)) {
        return new Promise((resolve, reject) => {
          reject(
            UniversalFunctions.sendError(
              UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR
                .INVALID_EMAIL_FORMAT
            )
          );
        });
      } else {
        return new Promise((resolve, reject) => {
          Controller.AgentController.registerAgent(payloadData, function (
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
      }
    },
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().valid("MALE", "FEMALE", "N/A"),
        email: Joi.string().email().required(),
        mobile: Joi.string()
          .trim()
          .regex(/^[0-9]{9}$/),
        password: Joi.string()
          .min(8)
          .max(16)
          .required(),
        expertise: Joi.array().items(Joi.string()), 
        interestedStudents: Joi.array().items(Joi.string().allow(''))
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

var agentLogin = {
  method: "POST",
  path: STUDENTAPI+"login",
  config: {
    description: "Login Agent API",
    tags: ["api", "agent"],
    handler: function(request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.AgentController.agentLogin(userData, function(
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
        email: Joi.string().email().required(),
        password: Joi.string()
        .min(8)
        .max(16)
        .required()
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

var getAllAgents = {
  method: "GET",
  path: STUDENTAPI+"getallagents",
  config: {
    description: "Get Agent API",
    tags: ["api", "agent"],
    handler: function(request, h) {
      return new Promise((resolve, reject) => {
        Controller.AgentController.getAllAgents(function(
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

var getAgent = {
  method: "GET",
  path: STUDENTAPI+"getagent/{id}",
  config: {
    description: "Get Agent API",
    tags: ["api", "agent"],
    handler: function(request, h) {
      var userData = request.params.id
      return new Promise((resolve, reject) => {
        Controller.AgentController.getAgent(userData,function(
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

var updateAgent = {
  method: "PUT",
  path: STUDENTAPI+"update/agent/{id}",
  config: {
    description: "Update Agent API",
    tags: ["api", "agent"],
    handler: function(request, h) {
      var userData = request.payload;
      return new Promise((resolve, reject) => {
        Controller.AgentController.updateAgent(userData, function(
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
      params:{
        id: Joi.string().required()
      },
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        gender: Joi.string().valid("MALE", "FEMALE", "N/A"),
        email: Joi.string().email().required(),
        mobile: Joi.string()
          .trim()
          .regex(/^[0-9]{9}$/),
          expertise: Joi.array().items(Joi.string()), 
          interestedStudents: Joi.array().items(Joi.string().allow(''))
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

var AgentRoutes = [registerAgent,agentLogin, getAgent, getAllAgents, updateAgent];
module.exports = AgentRoutes;
