var express = require('express');
var Product = require('../models/product');
var db = require('../services/database');
var _ = require('lodash');
var router = express.Router();

router.get('/', function(req, res) {
	Product.find({})
		.limit(300)
		.sort([['specialPrice.price', 'descending'], ['price', 'descending']])
		.exec(function (err, products) {
			if (err) {
				return handleError(res, err);
			}
			res.status(200).json(products);
		});
});

router.get('/:id', function(req, res) {
	if(req.params.id) {
		Product.findById(req.params.id, function(err, product) {
			if(err) {
				res.status(400).json({ error: 'Product with such id is not exist' });
			}

			res.status(200).json(product);
		})
	} else {
		res.status(400).json({ error: 'Product id is missing' });
	}
});

router.put('/:id', function(req, res) {
	update(req, res);
});

router.patch('/:id', function(req, res) {
	update(req, res);
});

router.delete('/:id', function(req, res) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		if (!product) {
			return res.sendStatus(404);
		}
		product.remove(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.sendStatus(204);
		});
	});
});

router.post('/', function(req, res) {
	Product.create(req.body, function (err, product) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, product);
	});
});

function update(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}

	if(!req.params.id) {
		res.status(400).json({ error: 'Product id is missing' });
	}

	Product.findById(req.params.id, function (err, product) {
		if (err) {
			return handleError(res, err);
		}

		if (!product) {
			return res.send(404);
		}

		var updated = _.merge(product, req.body);

		updated.pictures = req.body.pictures;

		updated._doc.pictures._markModified();

		updated.save(function (err) {
			if (err) {
				return handleError(res, err);
			}
			return res.status(200).json(updated);
		});
	});
}

function handleError(res, err) {
	return res.send(500, err);
}

module.exports = router;
