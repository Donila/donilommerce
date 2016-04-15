var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
	name: String,
	nameKey: String,
	thumbnail: String,
	externalId: String,
	externalParentId: String,
	parentCategory: mongoose.Schema.Types.ObjectId
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', Schema);
