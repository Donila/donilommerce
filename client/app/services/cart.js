angular.module('Donilommerce')
	.factory('Cart', function ($rootScope, $cookies, $uibModal, Products) {
		var cookieName = 'globalCart';

		return {
			fromCookies: function() {
				var cartInCookies = $cookies.get(cookieName);
				if(cartInCookies) {
					$rootScope.cart = JSON.parse(cartInCookies);
				}
			},

			addToCart: function(product) {
				if(!$rootScope.cart) {
					$rootScope.cart = [];
				}

				var found = _.find($rootScope.cart, function(p) { return p.product._id == product._id; });

				if(found) {
					found.count++;
				} else {
					var prod = {
						_id: product._id,
						name: product.name,
						price: product.price,
						thumbnail: product.thumbnail,
						pictures: product.pictures
					};

					if(product.specialPrice) {
						prod.specialPrice = product.specialPrice;
					}

					$rootScope.cart.push({product: prod, count: 1});
				}

				$cookies.put(cookieName, JSON.stringify($rootScope.cart));

				var modalInstance = $uibModal.open({
					animation: true,
					templateUrl: 'productAddedToCart.html',
					controller: 'ModalInstanceCtrl',
					size: 'sm',
					resolve: {
						lastAdded: function () {
							return product;
						}
					}
				});
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

				$cookies.put(cookieName, JSON.stringify($rootScope.cart));
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
					var price = Products.getProductPrice(p.product);
					var pCost = price * p.count;
					cost += pCost;
				});

				return cost;
			},

			clear: function() {
				$cookies.remove(cookieName);
				$rootScope.cart = [];
			}
		}
	});
