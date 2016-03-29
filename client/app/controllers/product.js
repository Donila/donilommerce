angular.module('Donilommerce')
	.controller('ProductCtrl', function ($scope, $http, $rootScope, $uibModal, $routeParams, locale, Cart, Products) {
		$scope.locale = locale;
		if($routeParams.id) {
			Products.get($routeParams.id).then(function(result) {
				$scope.product = result;
			});
		}

		$scope.addToCart = Cart.addToCart;
	});

