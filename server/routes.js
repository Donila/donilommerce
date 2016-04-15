var authController = require('./controllers/auth');
var dbController = require('./controllers/database');
var productsController = require('./controllers/products');
var categoriesController = require('./controllers/categories');

module.exports = function(app) {
    app.use('/api/auth', authController);
	app.use('/api/db', dbController);
	app.use('/api/products', productsController);
	app.use('/api/categories', categoriesController);
};
