XLSX = require('xlsx');
_ = require('lodash');

var websiteContent = 'http://diverix.by/content/images/thumbs/';

module.exports = {
	parse: function (fileName) {
		var workbook = XLSX.readFile(fileName);

		var products = [];
		var neededFields = {
			'D': 'name',
			'E': 'shortDescription',
			'F': 'fullDescription',
			'J': 'metaKeywords',
			'M': 'seName',
			'BM': 'specialPrice',
			'BN': 'specialPriceStart',
			'BO': 'specialPriceEnd',
			'BJ': 'price',
			'BW': 'createdOnUtc',
			'BX': 'categoryIds',
			'BY': 'manufacturerIds',
			'BZ': 'picture1',
			'CA': 'picture2',
			'CB': 'picture3'
		};

		for (var cell = 2; cell < 147; cell++) {
			var product = {};
			for (var key in neededFields) {
				product[neededFields[key]] = workbook.Sheets.Products[key + cell];
			}
			products.push(product);
		}

		return products;
	},

	map: function(fileName) {
		var productsParsed = this.parse(fileName);

		var products = [];
		var id = 0;
		_.forEach(productsParsed, function(prod) {
			var thumb;
			var pictures = [];
			var splitted;
			var specialPrice;
			if(prod.picture1.h) {
				splitted = prod.picture1.h.split('\\');
				thumb = websiteContent + splitted[splitted.length - 1];
			}
			if(prod.picture2 && prod.picture2.h) {
				splitted = prod.picture2.h.split('\\');
				pictures.push(websiteContent + splitted[splitted.length - 1]);
			}
			if(prod.picture3 && prod.picture3.h) {
				splitted = prod.picture3.h.split('\\');
				pictures.push(websiteContent + splitted[splitted.length - 1]);
			}
			if(prod.specialPrice && prod.specialPriceStart && prod.specialPriceEnd) {
				specialPrice = {
					price: prod.specialPrice.v,
					start: prod.specialPriceStart.v,
					end: prod.specialPriceEnd.v
				}
			}

			var product = {
				_id: id++,
				name: prod.name.h,
				price: prod.price.v,
				thumbnail: thumb,
				pictures: pictures,
				shortDescription: prod.shortDescription ? prod.shortDescription.h : '',
				fullDescription: prod.fullDescription ? prod.fullDescription.h : ''
			};

			if(specialPrice) {
				product.specialPrice = specialPrice;
			}

			products.push(product);
		});

		return products;
	}
};
