var database = require('../../services/database');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cmslocaldb');

database.addFromNopCommerce(function(products) {
	console.log('OK');
	console.log(products);
}, function(err) {
	console.log('ERR');
	console.log(err);
});
