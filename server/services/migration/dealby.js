XLSX = require('xlsx');
_ = require('lodash');

module.exports = {
	parse: function(fileName) {
		var workbook = XLSX.readFile(fileName);

		var productsSheetName;
		var categoriesSheetName;

		if(workbook.SheetNames.length > 1) {
			productsSheetName = workbook.SheetNames[0];
			categoriesSheetName = workbook.SheetNames[1];
		} else {
			throw new Error('These is less than 2 sheets in doc. Expected: 2 sheets(for products and groups)');
		}

		var categoriesSheet = workbook.Sheets[categoriesSheetName];
		var productSheet = workbook.Sheets[productsSheetName];

		var categoriesMapping = {
			'A': 'externalId',
			'B': 'name',
			//'C': 'groupId',
			'D': 'externalParentId'
			//'E': 'externalParentGroupId'
		};

		var productsMapping = {
			//'A': 'unknownIdentifier',
			'B': 'name',
			'C': 'metaKeys',
			'D': 'fullDescription',
			//'E': 'externalProductType',
			'F': 'price',
			'L': 'thumbnail',
			'N': 'externalCategoryId',
			'S': 'externalId',
			//'W': 'manufacturer',
			'Y': 'manufacturerCountry'
		};

		var ENGLISH = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var productCharacteristicsStartLetters = 'AF';

		var categories = parseSheet(categoriesSheet, categoriesMapping);
		var products = parseSheet(productSheet, productsMapping);

		_.forEach(products, function(p) {
			if(p.thumbnail) {
				var splittedImages = p.thumbnail.split(', ');
				if(splittedImages) {
					p.thumbnail = splittedImages[0];

					if(splittedImages.length > 1) {
						splittedImages.splice(0, 1);
						p.pictures = splittedImages;
					}
				}
			}
		});

		return { categories: categories, products: products };
	}
};

/*
* mapping example:
* { 'A': 'name', 'B': 'description' }
* where keys (A, B) is excel columns, values (name, description) is fields in output collection
* */
function parseSheet(sheet, mapping) {
	var items = [];
	var splittedRef = sheet['!ref'].split(':');
	var lastField = splittedRef[splittedRef.length - 1];
	var length = lastField.replace(/\D/g,'');

	for(var i = 2; i <= length; i++) {
		var item = {};
		for(var letter in mapping) {
			var cell = letter + i;

			var cellValue = sheet[cell];
			var cellStringValue = '';

			if(cellValue && (cellValue.h || cellValue.v)) {
				cellStringValue = cellValue.h ? cellValue.h : cellValue.v;
			}

			item[mapping[letter]] = cellStringValue;
		}
		items.push(item);
	}

	return items;
}
