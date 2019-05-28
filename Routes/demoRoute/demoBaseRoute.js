/**
 * Created by Navit on 15/11/16.
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var Joi = require('joi');
var Config = require('../../Config');

var demoApi = {
    method: 'POST',
    path: '/api/demo/demoApi/',
    config: {
        description: 'demo api',
        tags: ['api', 'demo'],
        handler: function (request, reply) {
            var userData = request.payload;
            return UniversalFunctions.sendSuccess(Config.APP_CONSTANTS.STATUS_MSG.SUCCESS.DEFAULT, userData);
        },
        validate: {
            payload:{
                message:Joi.string().required()
            },
            failAction: UniversalFunctions.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                responseMessages: UniversalFunctions.CONFIG.APP_CONSTANTS.swaggerDefaultResponseMessages
            }
        }
    }
};

var DemoBaseRoute =
    [
        demoApi
    ]
module.exports = DemoBaseRoute;