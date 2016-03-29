angular.module('Donilommerce')
	.controller('CheckoutCtrl', function ($scope, $rootScope, $location,  Cart, Products, locale) {
		if(!$rootScope.cart || $rootScope.cart.length == 0) {
			$location.path('main');
		}

		$scope.products = $rootScope.products;

		$scope.removeFromCart = Cart.removeFromCart;

		$scope.cartCost = Cart.cartCost;

		$scope.getProductPrice = Products.getProductPrice;

		$scope.locale = locale;

		$scope.customer = {};

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

		$scope.submitForm = function(customer) {
			var form = $scope.checkoutForm;
			if(form.$valid) {
				$scope.orderSubmitted = true;
				Cart.clear();
			}
		};
	});
