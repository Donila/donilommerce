var xlsToJson = require('../../services/migration/xlsToJson');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect('mongodb://localhost/cmslocaldb');

xlsToJson.mapCategories(path.join(__dirname, 'products.xlsx'));
