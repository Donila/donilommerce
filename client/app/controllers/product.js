angular.module('Donilommerce')
	.controller('ProductCtrl', function ($scope, $http, $rootScope, $uibModal, $routeParams, locale, Cart, Products, Categories) {
		$scope.locale = locale;
		$scope.loading = true;
		if($routeParams.id) {
			Products.get($routeParams.id).then(function(product) {
				$scope.product = product;

				Categories.getAll().then(function(categories) {
					$scope.categories = categories;

					$scope.loading = false;
				}, function(err) {
					console.log(err);
					$scope.loading = false;
				});
			}, function(err) {
				console.log(err);
				$scope.loading = false;
			});
		}

		$scope.addToCart = Cart.addToCart;
	});

