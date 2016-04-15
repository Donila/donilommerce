
module.exports.login = function(user, callback) {
    if(user && callback) {
        callback({ success: true, message: user.fullName + ' is logged in.' });
    }
};

module.exports.logout = function(callback) {
    if(callback) {
        callback({ success: true });
    }
};

module.exports.getCurrentUser = function(callback) {
    if(callback) {
        callback({ name: 'Noob' });
    }
};
