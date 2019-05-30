/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../Config");
var Controller = require("../Controllers");

var registerStudent = {
  method: "POST",
  path: "/api/v1/student/register/",
  config: {
    description: "register student api",
    tags: ["api", "student"],
    handler: function(request, h) {
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
          Controller.StudentController.registerStudent(payloadData, function(
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
        email: Joi.string().required(),
        mobile: Joi.string()
          .trim()
          .regex(/^[0-9]{9}$/),
        password: Joi.string()
          .min(8)
          .max(16)
          .required(),
        interestedCourses: Joi.array().items(Joi.number())
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

var StudentRoutes = [registerStudent];
module.exports = StudentRoutes;
