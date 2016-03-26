angular.module('clientApp')
	.controller('NavbarCtrl', function ($scope, $location, locale, globalConfig) {
		$scope.items = [{
			key: 'Home',
			link: '/'
		},{
			key: 'Cart',
			link: '/cart'
		}];

		$scope.getAppName = function() {
			return locale.getString('common.' + globalConfig.appNameKey) || c.appName;
		};

		$scope.isActive = function(link) {
			return $location.path() === link;
		}
	});
