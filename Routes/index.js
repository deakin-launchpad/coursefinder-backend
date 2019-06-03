/**
 * Created by Navit
 */
'use strict'

var DemoBaseRoute = require('./demoRoute/demoBaseRoute');
const StudentRoute = require('./studentRoute/studentRoute')
const AgentRoute = require('./agentRoute/agentRoute')
const CourseRoute = require('./courseRoute/courseRoute')
const NewsRoute = require('./newsRoute/newsRoute')
var APIs = [].concat(DemoBaseRoute, StudentRoute, AgentRoute, CourseRoute, NewsRoute);
module.exports = APIs;