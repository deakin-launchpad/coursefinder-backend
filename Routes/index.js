/**
 * Created by Navit
 */
'use strict'

var DemoBaseRoute = require('./demoRoute/demoBaseRoute');
const StudentRoutes = require('./studentRoutes')
var APIs = [].concat(DemoBaseRoute, StudentRoutes);
module.exports = APIs;