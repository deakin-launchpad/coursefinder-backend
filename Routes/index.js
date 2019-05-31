/**
 * Created by Navit
 */
'use strict'

var DemoBaseRoute = require('./demoRoute/demoBaseRoute');
const StudentRoute = require('./studentRoute/studentRoute')
const AgentRoute = require('./agentRoute/agentRoute')
var APIs = [].concat(DemoBaseRoute, StudentRoute, AgentRoute);
module.exports = APIs;