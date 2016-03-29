angular.module('Donilommerce').directive('donPrice', function () {
	return {
		scope: {
			product: '='
		},
		controller: function ($scope, $rootScope, Currency, EVENT_CONSTANTS) {
			$scope.currency = $rootScope.currency;
			$scope.getToFixed = function () {
				if ($scope.currency.name == 'BYR') {
					return 0;
				}
				if ($scope.currency.name == 'USD') {
					return 2;
				}
			};

			$scope.$on(EVENT_CONSTANTS.CURRENCY_CHANGED, function () {
				$scope.currency = $rootScope.currency;
			})
		},

		templateUrl: 'app/directives/price/price.html'
	};
});
