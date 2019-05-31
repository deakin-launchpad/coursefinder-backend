const DBSERVICE = require('./databaseService')

const SERVICES = {

    AGENTSERVICE: new DBSERVICE('AGENT'),
    STUDENTSERVICE: new DBSERVICE('STUDENT'),
    COURSESERVICE: new DBSERVICE('COURSE'),
    NEWSSERVICE: new DBSERVICE('NEWS')

}

module.exports = SERVICES