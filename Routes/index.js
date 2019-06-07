/**
 * Created by Navit
 */
'use strict'

var DemoBaseRoute = require('./demoRoute/demoBaseRoute');
const StudentRoute = require('./studentRoute/studentRoute');
const AgentRoute = require('./agentRoute/agentRoute');
const CourseRoute = require('./courseRoute/courseRoute');
const NewsRoute = require('./newsRoute/newsRoute');
const ApplicationRoute = require('./applicationRoute/applicationRoute')
var APIs = [].concat(DemoBaseRoute, StudentRoute, AgentRoute, CourseRoute, NewsRoute, ApplicationRoute);
module.exports = APIs;