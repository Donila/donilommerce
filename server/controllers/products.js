var express = require('express');
var xslToJson = require('../services/migration/xlsToJson');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(req, res) {
	var products = xslToJson.map('./server/services/migration/products.xlsx');

	res.status(200).json(products);
});

router.get('/:id', function(req, res) {
	var products = xslToJson.map('./server/services/migration/products.xlsx');
	if(req.params.id) {
		var product = _.find(products, function(p) { return p._id.toString() === req.params.id });

		res.status(200).json(product);
	} else {
		res.status(400).json({ error: 'Product id is missing' });
	}

});

module.exports = router;
