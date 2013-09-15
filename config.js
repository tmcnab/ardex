var express = require('express');
var path = require('path');
var config = {};

config.debug = process.env.DEBUG || true;

config.db = {};
config.db.connectionString = process.env.MONGOLAB_URI || 'mongodb://localhost/ardex';

config.codex = {};
config.codex.bcryptWorkFunction = 15;
config.codex.appName = "ardex";

config.express = {};
config.express.cookies = {};
config.express.cookies.secret = "ASDFASDFASDFASDF";


config.configureExpress = function (app) 
{
	// Server Shit
	app.set('port', process.env.PORT || 3001);

	// Views Shit
	app.set('views', __dirname + '/views');
	app.set('view engine', 'hjs');
	app.set('layout', 'layout');
	app.enable('view cache');
	app.engine('hjs', require('hogan-express'));

	// Middleware Shit
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// Session shit
	app.use(express.cookieParser());

	// Routing shit
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));

	// Models Shit
	var Article = require('./models/Article');
	Article.synchronize();

	// Dev Shit
	if (config.debug) {
		app.use(express.errorHandler());
	}
}

module.exports = config;