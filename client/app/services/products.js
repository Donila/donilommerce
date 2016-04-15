angular.module('Donilommerce')
	.factory('Products', function ($http, $rootScope, $cookies, $q) {
		return {
			getAll: function() {
				var deferred = $q.defer();

				$http.get('/api/products').then(function(response) {
					$rootScope.products = response.data;
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			get: function(id) {
				var deferred = $q.defer();

				$http.get('/api/products/' + id).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			update: function(product) {
				var deferred = $q.defer();

				$http.put('/api/products/' + product._id, product).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			create: function(product) {
				var deferred = $q.defer();

				$http.post('/api/products/', product).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			delete: function(productId) {
				var deferred = $q.defer();

				$http.delete('/api/products/' + productId).then(function(response) {
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
