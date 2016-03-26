'use strict'

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http');
var util = require('util');

var app = express();
var server = http.createServer(app);

mongoose.connect(config.mongoUri);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

var routes = require('./routes')(app);
app.use(express.static('client'));

// Start server
function startServer() {
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

setImmediate(startServer);
