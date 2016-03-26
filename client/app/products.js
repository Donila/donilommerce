angular.module('clientApp')
	.factory('Products', function ($http, $rootScope) {
		return {
			get: function() {
				return [
					{name: 'Носки', price: 1.35, _id: 1},
					{name: 'Трусы', price: 3.15, _id: 2},
					{name: 'Понтолоны', price: 5.74, _id: 3},
					{name: 'Чулки', price: 2.12, _id: 4},
					{name: 'Мозги', price: 100.00, _id: 5}
				]
			},

			addToCart: function(product) {
				if(!$rootScope.cart) {
					$rootScope.cart = [];
				}

				var found = _.find($rootScope.cart, function(p) { return p.product._id == product._id; });

				if(found) {
					found.count++;
				} else {
					$rootScope.cart.push({product: product, count: 1});
				}
			},

			removeFromCart: function(product) {
				if(!$rootScope.cart) {
					$rootScope.cart = [];
					return;
				}

				var found = _.find($rootScope.cart, function(p) { return p.product._id == product._id; });

				if(found) {
					if(found.count > 1){
						found.count--;
					} else {
						_.remove($rootScope.cart, function(p) {
							return p.product._id == product._id;
						});
					}
				}
			},

			cartLength: function() {
				var lengths = _.map($rootScope.cart, 'count');
				var count = 0;
				_.forEach(lengths, function(l) {
					count += l;
				});

				return count;
			},

			cartCost: function() {
				var cost = 0;
				_.forEach($rootScope.cart, function(p) {
					var pCost = p.product.price * p.count;
					cost += pCost;
				});

				return cost;
			}
		}
	});
