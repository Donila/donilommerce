angular.module('Donilommerce')
	.controller('ProductsCtrl', function ($scope, $http, $rootScope, $location, $uibModal, Cart, Products) {
		$scope.loading = true;

		Products.getAll().then(function (result) {
			$scope.products = result;
			$scope.loading = false;
		}, function (reason) {
			$scope.error = reason;
			$scope.loading = false;
		});

		$scope.addToCart = function (product) {
			Cart.addToCart(product);
		};

		$scope.goTo = function(product) {
			$location.path('products/' + product._id);
		};
	});
