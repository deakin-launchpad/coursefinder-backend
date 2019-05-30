/**
 * Created by Navit
 */

'use strict';
//External Dependencies
var Hapi = require('hapi');

//Internal Dependencies
var Config = require('./Config');
var Plugins = require('./Plugins');
var SocketManager = require('./Lib/SocketManager');
var Routes = require('./Routes')
const DBHELPER = require('./Utils/dbHelper')
const debug = require('debug')('app:server')

const init = async () => {

    //Start database
    await DBHELPER.establishConnection(Config.DBCONFIG, (err) => {
        if(err) return;
    })

    //Create Server
    var server = new Hapi.Server({
        app: {
            name: Config.APP_CONSTANTS.SERVER.appName
        },
        port: process.env.PORT || Config.APP_CONSTANTS.SERVER.PORTS.HAPI,
        routes: { cors: true }
    });


    //Register All Plugins
    await server.register(Plugins,{},(err) => {
        if (err) {
            server.log(['error'], 'Error while loading plugins : ' + err)
        }
        else {
            server.log(['info'], 'Plugins Loaded') 
        }
    })

    //add views
    await server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: './views'
    });

    //Default Routes
    server.route(
        {
            method: 'GET',
            path: '/',
            handler: function (req, res) {
                return res.view('welcome')
            }
        }
    );

    server.route(Routes);

    SocketManager.connectSocket(server);

    server.events.on('response', function (request) {
        debug(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.pathname + ' --> ' + request.response.statusCode);
        debug('Request payload:', request.payload);
    });

    // Start Server
    await server.start();
    debug('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
