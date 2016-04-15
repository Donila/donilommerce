var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');
var path = require('path');

var Category = require('../models/category');
var Product = require('../models/product');

var xlsToJson = require('./migration/xlsToJson');
var dealby = require('./migration/dealby');

module.exports = {
	init: function() {
		var deferred = Q.defer();

		var products = xlsToJson.map(path.join(__dirname, '/migration/products.xlsx'));

		Product.create(products, function(err, products) {
			if(err) {
				deferred.reject(err);
			}

			deferred.resolve(products);
		});

		return deferred.promise;
	},

	addFromNopCommerce: function(fileName) {
		var deferred = Q.defer();

		var categories = xlsToJson.mapCategories(fileName);

		var dbCats = [];

		_.forEach(categories, function(c) {
			dbCats.push({name: c});
		});

		Category.create(dbCats, function(err, categories) {
			if(err) {
				deferred.reject(err);
			}

			var products = xlsToJson.mapProducts(path.join(__dirname, '/migration/products.xlsx'));

			_.forEach(products, function(p) {
				if(p.categoryIds) {
					var foundCategory = _.find(categories, function(c) { return c.name == p.categoryIds});
					if(foundCategory) {
						p.category = foundCategory._id;
					}
				}
			});

			Product.create(products, function(err, products) {
				if(err) {
					deferred.reject(err);
				}

				deferred.resolve({
					products: products,
					categories: categories
				});
			})
		});

		return deferred.promise;
	},

	addFromDealBy: function(fileName) {
		var deferred = Q.defer();

		var dealbyObject = dealby.parse(fileName);

		// Creating categories
		Category.create(dealbyObject.categories, function(err, categories) {
			if(err) {
				deferred.reject(err);
			}

			// Linking categories with each other by external categoryIds
			_.forEach(categories, function(category) {
				if(category.externalParentId) {
					var parentCategory = _.find(categories, function(c) {
						return c.externalId == category.externalParentId
					});

					category.parentCategory = parentCategory._id;
					category.save().then(function(categoryUpdated) {
						console.log("%s got parent category %s", categoryUpdated.name, categoryUpdated.parentCategory);
					});
				}
			});

			// Add category references to products
			_.forEach(dealbyObject.products, function(product) {
				if(product.externalCategoryId) {
					var category = _.find(categories, function(c) {
						return c.externalId == product.externalCategoryId;
					});
					product.category = category._id;
				}
			});

			// Creating products
			Product.create(dealbyObject.products, function(err, products) {
				if(err) {
					deferred.reject(err);
				}

				deferred.resolve({products: products, categories: categories });
			})
		});

		return deferred.promise;
	},
	cleanProducts: function() {
		var deferred = Q.defer();

		Product.remove({}, function(err) {
			if(err) {
				deferred.reject(err);
			}

			deferred.resolve();
		});

		return deferred.promise;
	},
	cleanCategories: function() {
		var deferred = Q.defer();

		Category.remove({}, function(err) {
			if(err) {
				deferred.reject(err);
			}

			deferred.resolve();
		});

		return deferred.promise;
	}
};
