'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
	.controller('MainCtrl', function ($scope, $http, $rootScope, Products) {
		$scope.loading = true;

		$scope.products = Products.get();

		$scope.addToCart = function(product) {
			Products.addToCart(product);
		};
	});
