angular.module('Donilommerce')
	.controller('AdminProductsCtrl', function ($scope, $rootScope, Products, Categories, locale) {

		init();

		$scope.getProductPrice = Products.getProductPrice;

		$scope.deleteProduct = function(product) {
			$scope.deletingProduct = product;
			Products.delete(product._id).then(function() {
				$scope.deletingProduct = null;
				$scope.products = _.without($scope.products, product);
				$scope.messages.push('Product deleted');
			}, function(err) {
				$scope.deletingProduct = null;
				$scope.errors.push(err);
			});
		};

		function init() {
			$scope.loading = true;
			$scope.deletingProduct = null;

			reset();

			Products.getAll().then(function (result) {
				$scope.products = result;

				Categories.getAll().then(function(categories) {
					$scope.categories = categories;
					sortProductsByCategories();
					$scope.loading = false;
				}, function(err) {
					$scope.errors.push(err);
					$scope.loading = false;
				});

			}, function (reason) {
				$scope.errors.push(reason);
				$scope.loading = false;
			});
		}

		function reset() {
			$scope.errors = [];
			$scope.messages = [];
		}

		function sortProductsByCategories() {
			var categories = [ { name: 'No category', products: [] } ];
			_.forEach($scope.products, function(p) {
				if(p.category) {
					var foundCategory = _.find(categories, { _id: p.category });
					if(foundCategory) {
						foundCategory.products.push(p);
					} else {
						var actualCategory = _.find($scope.categories, { _id: p.category });
						actualCategory.products = [p];
						categories.push(actualCategory);
					}
				} else {
					categories[0].products.push(p);
				}
			});

			$scope.categorizedProducts = _.sortBy(categories, function(o) { return o.name; });
		}
	});
