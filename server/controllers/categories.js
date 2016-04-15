var express = require('express');
var Category = require('../models/category');
var _ = require('lodash');
var router = express.Router();
var Q = require('q');

router.get('/', function(req, res) {
	Category.find({})
		.limit(300)
		.sort([['name', 'ascending']])
		.exec(function (err, categories) {
			if (err) {
				return handleError(res, err);
			}
			res.status(200).json(categories);
		});
});

router.get('/:id', function(req, res) {
	if(req.params.id) {
		Category.findById(req.params.id, function(err, category) {
			if(err) {
				res.status(400).json({ error: 'Category with such id is not exist' });
			}

			res.status(200).json(category);
		})
	} else {
		res.status(400).json({ error: 'Category id is missing' });
	}
});

router.put('/:id', function(req, res) {
	update(req, res);
});

router.patch('/:id', function(req, res) {
	update(req, res);
});

router.delete('/:id', function(req, res) {
	Category.findById(req.params.id, function (err, category) {
		if (err) {
			return handleError(res, err);
		}
		if (!category) {
			return res.sendStatus(404);
		}
		Category.update({ parentCategory: category._id }, { parentCategory: undefined }, {multi: true},
			function(err, num) {
				if(err) {
					return handleError(res, err);
				}

				console.log("Categories count where parent set to undefined: " + num.n);

				category.remove(function (err) {
					if (err) {
						return handleError(res, err);
					}
					return res.sendStatus(204);
				});
			}
		);
	});
});

router.post('/', function(req, res) {
	Category.create(req.body, function (err, category) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(201, category);
	});
});

function update(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}

	if(!req.params.id) {
		res.status(400).json({ error: 'Product id is missing' });
	}

	Category.findById(req.params.id, function (err, category) {
		if (err) {
			return handleError(res, err);
		}

		if (!category) {
			return res.send(404);
		}

		var updated = _.merge(category, req.body);

		if(!req.body.parentCategory) {
			updated.parentCategory = undefined;
		}

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
