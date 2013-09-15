//////////////////////////////////////////////////////////////////////////////
// Imports
//////////////////////////////////////////////////////////////////////////////
var cfg = require('./config.js');
var express = require('express');
var http = require('http');

var db = require('mongoose').connect(cfg.db.connectionString)
var app = express();

cfg.configureExpress(app);
require('./actions/actions')(app);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});