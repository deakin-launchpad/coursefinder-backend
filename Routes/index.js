/**
 * Created by Navit
 */
'use strict'

var DemoBaseRoute = require('./demoRoute/demoBaseRoute');
const StudentRoute = require('./studentRoute/studentRoute')
const AgentRoute = require('./agentRoute/agentRoute')
const CourseRoute = require('./courseRoute/courseRoute')

var APIs = [].concat(DemoBaseRoute, StudentRoute, AgentRoute, CourseRoute);
module.exports = APIs;