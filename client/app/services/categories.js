angular.module('Donilommerce')
	.factory('Categories', function ($http, $rootScope, $cookies, $q) {
		return {
			getAll: function() {
				var deferred = $q.defer();

				$http.get('/api/categories').then(function(response) {
					$rootScope.categories = response.data;
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			get: function(id) {
				var deferred = $q.defer();

				$http.get('/api/categories/' + id).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			update: function(category) {
				var deferred = $q.defer();

				if(category.parentCategory === '' || category.parentCategory === null ) {
					delete category.parentCategory;
				}

				$http.put('/api/categories/' + category._id, category).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			create: function(category) {
				var deferred = $q.defer();

				if(category.parentCategory === '' || category.parentCategory === null ) {
					delete category.parentCategory;
				}

				$http.post('/api/categories/', category).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			},

			delete: function(categoryId) {
				var deferred = $q.defer();

				$http.delete('/api/categories/' + categoryId).then(function(response) {
					deferred.resolve(response.data);
				}, function(error) {
					deferred.reject(error);
				});

				return deferred.promise;
			}
		}
	});
