angular.module('clientApp')
	.controller('CartCtrl', function ($scope, $rootScope, Products, locale) {
		$scope.loading = true;

		$scope.products = $rootScope.cart;

		$scope.removeFromCart = Products.removeFromCart;

		$scope.cartCost = Products.cartCost;

		$scope.totalValue = function() {
			return locale.getString('common.Total') + ': ' + $scope.cartCost();
		}
	});
