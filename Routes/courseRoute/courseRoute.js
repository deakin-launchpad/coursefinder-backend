/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const COURSEAPI = '/api/course/v1/'

var insertCourse = {
    method: "POST",
    path: COURSEAPI + "create",
    config: {
        description: "Create course API",
        tags: ["api", "course"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.CourseController.insertCourse(payloadData, function (
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
                name: Joi.string().required(),
                description: Joi.string().required(),
                university:{ name: Joi.string().required(), logo: Joi.string().required(), location: Joi.string().required()},
                contact: Joi.string().required(),
                courseLevel: Joi.string().required(),
                fees: Joi.number(),
                department: Joi.string().required(),
                website: Joi.string().uri() 
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

var getAllCourses = {
    method: "GET",
    path: COURSEAPI + "getcourses",
    config: {
        description: "Get course API",
        tags: ["api", "course"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.CourseController.getAllCourses(function (
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

var getCourse = {
    method: "GET",
    path: COURSEAPI + "getcourse/{id}",
    config: {
        description: "Get course API",
        tags: ["api", "course"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.CourseController.getCourse(request.params.id,function (
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

var updateCourse = {
    method: "PUT",
    path: COURSEAPI + "updatecourse/{id}",
    config: {
        description: "Create course API",
        tags: ["api", "course"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.CourseController.insertCourse(payloadData, function (
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
                name: Joi.string().required(),
                description: Joi.string().required(),
                university:{ name: Joi.string().required(), logo: Joi.string().required(), location: Joi.string().required()},
                contact: Joi.string().required(),
                courseLevel: Joi.string().required(),
                fees: Joi.number(),
                department: Joi.string().required(),
                website: Joi.string().uri() 
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

var CourseRoutes = [insertCourse,getAllCourses, getCourse,updateCourse];
module.exports = CourseRoutes;
