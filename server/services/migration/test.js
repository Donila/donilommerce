var parser = require('./xlstojson');

var book = parser.map('products.xlsx');

console.log(book[0]);
