angular.module('Donilommerce')
	.controller('widgetDiscountItemsCtrl', function($scope, Products) {
		$scope.loading = true;

		Products.getAll().then(function(products) {
			$scope.products = products;

			$scope.discountProducts = _.filter(products, function(p) {
				return p.specialPrice;
			});

			$scope.loading = false;
		}, function(err) {
			$scope.loading = false;
		});
	});
