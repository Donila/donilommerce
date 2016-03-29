angular.module('Donilommerce')
	.factory('Currency', function ($rootScope, $cookies, globalConfig, currencySupported, EVENT_CONSTANTS) {
		return {
			init: function() {
				var currency = this.get();

				this.set(currency);
			},

			set: function(currency) {
				$cookies.put('globalCurrency', JSON.stringify(currency));

				$rootScope.currency = currency;

				$rootScope.$broadcast(EVENT_CONSTANTS.CURRENCY_CHANGED);
			},

			get: function() {
				var currencyInCookies = $cookies.get('globalCurrency');

				return currencyInCookies ? JSON.parse(currencyInCookies) :  _.find(currencySupported, { name: globalConfig.currency });
			}
		}
	});
