/**
 * Created by Vibhav
 */
var UniversalFunctions = require('../../Utils/UniversalFunctions');
var async = require("async");
var ERROR = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.ERROR;
var SUCESS = UniversalFunctions.CONFIG.APP_CONSTANTS.STATUS_MSG.SUCCESS;
const SERVICES = require('../../DB')


const createNews = function (payloadData, callback) {
    var newsData;

    async.series([

        function (cb) {
            newsData = payloadData
            const criteria = { title: newsData.title }
            SERVICES.NEWSSERVICE.getRecord(criteria, {}, {}, (err, data) => {
                if (err) cb(err)
                else if (data && data.length > 0) cb(ERROR.DEFAULT)
                else cb()
            })
        },
        function (cb) {
            newsData = payloadData
            SERVICES.NEWSSERVICE.createRecord(payloadData, function (err, data) {
                if (err) cb(err)
                else {
                    newsData = data
                    cb()
                }
            })
        }

    ], function (err, result) {
        if (err) return callback(err)
        else return callback(null, newsData)
    })

};


const getAllNews = function (callback) {
    const criteria = {}
    const projections = {
        '_id': 0,
    }

    SERVICES.NEWSSERVICE.getRecord(criteria, projections, {}, (err, data) => {
        if (err) return callback(err)

        else if (data && data.length > 0) return callback(null, data)

        else return callback(ERROR.USER_NOT_FOUND)
    })
}

const getNews = function (payloadData, callback) {
    const criteria = { _id: payloadData }
    const projections = {
        '__v': 0,
    }
    SERVICES.NEWSSERVICE.getRecord(criteria, projections, {}, (err, data) => {
        if (err) return callback(err)

        else if (data && data.length > 0) return callback(null, data)

        else return callback(ERROR.DEFAULT)
    })
}


const updateNews = function (payloadData, callback) {
    var newsData;
    async.series([

        function (cb) {
            newsData = payloadData
            const criteria = { email: newsData.email }
            SERVICES.NEWSSERVICE.getRecord(criteria, {}, {}, (err, data) => {
                if (err) cb(err)
                else if (data && data.length > 0) cb()
                else cb(ERROR.DEFAULT)
            })
        },
        function (cb) {
            newsData = payloadData
            const criteria = { _id: payloadData.id }

            SERVICES.NEWSSERVICE.updateRecord(criteria, newsData, function (err, data) {
                if (err) cb(err)
                else {
                    newsData = data
                    cb()
                }
            })
        }

    ], function (err, result) {
        if (err) return callback(err)
        else return callback(null, newsData)
    })
}

module.exports = {
    createNews: createNews,
    getAllNews: getAllNews,
    getNews: getNews,
    updateNews: updateNews
};
