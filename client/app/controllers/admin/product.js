angular.module('Donilommerce')
	.controller('AdminProductCtrl', function ($scope, $http, $rootScope, $uibModal, $routeParams, $location, locale, Products, Categories) {
		$scope.locale = locale;
		$scope.errors = [];
		$scope.messages = [];
		$scope.saving = false;
		$scope.loading = true;

		if ($routeParams.id) {
			init();
		} else {
			$scope.errors.push('Product is not found.');
			$scope.loading = false;
		}

		$scope.reset = function () {
			reset();
		};

		$scope.save = function () {
			$scope.saving = true;
			$scope.errors = [];
			$scope.messages = [];

			if (!$scope.specialPriceNeeded) {
				$scope.product.specialPrice = undefined;
			}

			Products.update($scope.product).then(function (result) {
				init(result);
				$scope.messages.push('Product updated successfully.');
			}, function (err) {
				$scope.errors.push(err);
				$scope.saving = false;
			});
		};

		$scope.goToProducts = function () {
			$location.path('admin/products');
		};

		$scope.addEmptyPicture = function (product) {
			product.pictures.push('');
			$scope.productForm.$setDirty();
		};

		$scope.removePicture = function (product, index) {
			product.pictures.splice(index, 1);
			$scope.productForm.$setDirty();
		};

		function init() {
			Products.get($routeParams.id).then(function (product) {
				$scope.product = product;
				$scope.initialProduct = angular.copy($scope.product);

				Categories.getAll().then(function (categories) {
					$scope.categories = categories;

					$scope.specialPriceNeeded = $scope.product.specialPrice !== undefined;
					$scope.productForm.$setPristine();
					$scope.saving = false;
					$scope.loading = false;
				}, function (err) {
					console.log(err);
					$scope.saving = false;
					$scope.loading = false;
				});
			});
		}

		function reset() {
			$scope.product = angular.copy($scope.initialProduct);
			$scope.productForm.$setPristine();
		}
	});
