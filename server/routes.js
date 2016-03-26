var authController = require('./controllers/auth');

module.exports = function(app) {
    app.use('/api/auth', authController);
}