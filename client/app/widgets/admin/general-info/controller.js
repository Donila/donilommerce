angular.module('Donilommerce')
	.controller('adminWidgetGeneralInfoCtrl', function($scope, Products, Categories) {
		$scope.productsLoaded = false;
		$scope.categoriesLoaded = false;

		Products.getAll().then(function(products) {
			$scope.products = products;
			$scope.productsLoaded = true;
		}, function(err) {
			$scope.loading = false;
		});

		Categories.getAll().then(function(categories) {
			$scope.categories = categories;
			$scope.categoriesLoaded = true;
		}, function(err) {
			$scope.categoriesLoaded = false;
		});

		$scope.isLoading = function() {
			return $scope.productsLoaded && $scope.categoriesLoaded;
		}
	});
