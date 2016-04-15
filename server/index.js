'use strict'

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');
var http = require('http');
var util = require('util');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var server = http.createServer(app);

mongoose.connect(config.mongoUri);
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(morgan('dev'));

var routes = require('./routes')(app);

// Start server
function startServer() {
    server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });
}

setImmediate(startServer);
