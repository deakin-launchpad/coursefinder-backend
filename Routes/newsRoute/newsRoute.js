/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require("../../Utils/UniversalFunctions");
var Joi = require("joi");
var Config = require("../../Config");
var Controller = require("../../Controllers");
const NEWSAPI = '/api/news/v1/'

var insertNews = {
    method: "POST",
    path: NEWSAPI + "create",
    config: {
        description: "Create news API",
        tags: ["api", "news"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.NewsController.createNews(payloadData, function (
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
                title: Joi.string().required(),
                description: Joi.string(),
                content: { type: Joi.string().allow(['HTML', 'LINKS', 'VIDEO']), value: Joi.string().required() },
                tags: Joi.string().required(), //University Name, department so we can filter it
                postedBy: Joi.string()
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

var getAllNews = {
    method: "GET",
    path: NEWSAPI + "getnews",
    config: {
        description: "Get news API",
        tags: ["api", "news"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.NewsController.getAllNews(function (
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

var getNews = {
    method: "GET",
    path: NEWSAPI + "getnews/{id}",
    config: {
        description: "Get news API",
        tags: ["api", "news"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.NewsController.getNews(request.params.id, function (
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

var updateNews = {
    method: "PUT",
    path: NEWSAPI + "updatenews/{id}",
    config: {
        description: "Create news API",
        tags: ["api", "news"],
        handler: function (request, h) {
            var payloadData = request.payload;
            return new Promise((resolve, reject) => {
                Controller.NewsController.updateNews(payloadData, function (
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
                title: Joi.string().required(),
                description: Joi.string(),
                content: { type: Joi.string().allow(['HTML', 'LINKS', 'VIDEO']), value: Joi.string().required() },
                tags: Joi.string().required(), //University Name, department so we can filter it
                postedBy: Joi.string()
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

var NewsRoutes = [insertNews, getAllNews, getNews, updateNews];
module.exports = NewsRoutes;
