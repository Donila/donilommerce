var authController = require('./controllers/auth');
var productsController = require('./controllers/products');

module.exports = function(app) {
    app.use('/api/auth', authController);
	app.use('/api/products', productsController);
};
