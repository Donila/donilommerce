angular.module('Donilommerce')
	.controller('NavbarCtrl', function ($scope, $location, $rootScope, locale, globalConfig, currencySupported, Cart, Currency, Language) {
		$scope.items = [{
				key: 'Home',
				link: '/'
			},
			{
				key: 'Products',
				link: '/products'
			},
			{
				key: 'Cart',
				link: '/cart'
			}
		];

		$scope.supportedCurrencies = currencySupported;
		$scope.getLocale = Language.get;
		$scope.setLocale = Language.set;
		$scope.cartLength = Cart.cartLength;
		$scope.cartCost = Cart.cartCost;
		$scope.setCurrency = Currency.set;

		$scope.locale = locale;

		Cart.fromCookies();
		Currency.init();
		Language.init();

		$scope.getAppName = function() {
			return locale.getString('common.' + globalConfig.appNameKey) || globalConfig.appName;
		};

		$scope.isActive = function(link) {
			return $location.path() === link;
		};

		$scope.getCurrency = function() {
			return $rootScope.currency;
		};
	});
