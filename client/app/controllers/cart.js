angular.module('Donilommerce')
	.controller('CartCtrl', function ($scope, $rootScope, Cart, Products, locale) {
		$scope.products = $rootScope.cart;

		$scope.removeFromCart = Cart.removeFromCart;

		$scope.cartCost = Cart.cartCost;

		$scope.locale = locale;

		$scope.isEmpty = function() {
			return !$scope.products || $scope.products.length == 0;
		};

		$scope.clear = function() {
			Cart.clear();
			$scope.products = $rootScope.cart;
		};

		$scope.mouseEnter = function(p) {
			$scope.hoveredProduct = p.product._id;
		};

		$scope.mouseLeave = function() {
			$scope.hoveredProduct = undefined;
		};

		$scope.getProductPrice = Products.getProductPrice;
	});
