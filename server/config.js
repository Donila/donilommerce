module.exports = {
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost/cmslocaldb',
    
    ip: process.env.IP || 'localhost',
    
    port: process.env.PORT || '3000'
}