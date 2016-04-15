var mongoose = require('mongoose');
var Category = require('./category');
var Schema = new mongoose.Schema({
		name: String,
		nameKey: String,
		pictures: [String],
		price: Number,
		thumbnail: String,
		shortDescription: String,
		fullDescription: String,
		availability: [
			{
				shop: mongoose.Schema.Types.ObjectId,
				amount: Number
			}
		],
		category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
		specialPrice: {
			start: Date,
			end: Date,
			price: Number
		},
		externalId: String,
		externalCategoryId: String,
		properties: [{
			name: String,
			measure: String,
			value: String
		}],
		manufacturerCountry: String,
		metaKeys: String
	}, {
		timestamps: true
	});

module.exports = mongoose.model('Product', Schema);
