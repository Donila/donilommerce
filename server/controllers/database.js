var express = require('express');
var Product = require('../models/product');
var db = require('../services/database');
var _ = require('lodash');
var router = express.Router();
var path = require('path');

var dealByFile = path.join(__dirname, '../services/migration/dealby.xlsx');
var nopCommerceFile = path.join(__dirname, '../services/migration/products.xlsx');

router.get('/clean/products', function(req, res) {
	db.cleanProducts().then(function() {
		res.status(200).json("Database products cleaned.");
	});
});

router.get('/clean/categories', function(req, res) {
	db.cleanCategories().then(function() {
		res.status(200).json("Database categories cleaned.");
	});
});

router.get('/init/dealby', function(req, res) {
	db.addFromDealBy(dealByFile).then(function() {
		res.status(200).json("Database initialized from deal.by xlsx file.");
	});
});

router.get('/init/nopcommerce', function(req, res) {
	db.addFromNopCommerce(nopCommerceFile).then(function() {
		res.status(200).json("Database initialized from nopcommerce xlsx file.");
	});
});

module.exports = router;
