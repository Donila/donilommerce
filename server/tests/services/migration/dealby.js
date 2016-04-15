var dealby = require('../../../services/migration/dealby');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/cmslocaldb');

var fileName = path.join(__dirname, 'dealby.xlsx');

var parsedObject = dealby.parse(fileName);
