angular.module('Donilommerce')
	.factory('Products', function ($http, $rootScope, $cookies, $q) {
		return {
			getAll: function() {
				var deferred = $q.defer();

				$http.get('/api/products', {cache: false}).then(function(response) {
					$rootScope.products = response.data;
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			get: function(id) {
				var deferred = $q.defer();

				$http.get('/api/products/' + id, {cache: false}).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			getProductPrice: function(product) {
				return product.specialPrice ? product.specialPrice.price : product.price;
			}
		}
	});
