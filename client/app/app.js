'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
	.module('Donilommerce', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'ui.bootstrap',
		'ngLocalize',
		'ngLocalize.Config',
		'ngLocalize.InstalledLanguages'
	])
	.config(function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl',
				controllerAs: 'main'
			})
			.when('/cart', {
				templateUrl: 'views/cart.html',
				controller: 'CartCtrl',
				controllerAs: 'cart'
			})
			.when('/checkout', {
				templateUrl: 'views/checkout.html',
				controller: 'CheckoutCtrl',
				controllerAs: 'checkout'
			})
			.when('/products/:id', {
				templateUrl: 'views/product.html',
				controller: 'ProductCtrl',
				controllerAs: 'product'
			})
			.when('/products', {
				templateUrl: 'views/products.html',
				controller: 'ProductsCtrl',
				controllerAs: 'products'
			})
			.otherwise({
				redirectTo: '/'
			});
	})
	.value('localeConf', {
		basePath: 'languages',
		defaultLocale: 'en-US',
		sharedDictionary: 'common',
		fileExtension: '.lang.json',
		persistSelection: true,
		cookieName: 'COOKIE_LOCALE_LANG',
		observableAttrs: new RegExp('^data-(?!ng-|i18n)'),
		delimiter: '::',
		validTokens: new RegExp('^[\\w\\.-]+\\.[\\w\\s\\.-]+\\w(:.*)?$')
	})
	.value('currencySupported', [
		{ name: 'USD', sign: '$', exchange: 0.00005 },
		{ name: 'BYR', sign: 'бел. руб.', exchange: 1.00 }
	])
	.value('localeSupported', [
		'en-US',
		'ru-RU'
	])
	.value('localeFallbacks', {
		'en': 'en-US',
		'ru': 'ru-RU'
	})
	.value('globalConfig', {
		appName: 'Shop Name',
		appNameKey: 'Shop',
		currency: 'USD',
		language: 'en-US'
	})
	.constant('_', window._)
	.constant('EVENT_CONSTANTS', {
		CURRENCY_CHANGED: 'event_currency_changed'
	})
	.run(function($rootScope, locale, Currency, Language, localeFallbacks, globalConfig) {
		$rootScope._ = window._;

		Currency.init();

		Language.init();

		locale.ready('common').then(function () {
			//locale.setLocale(globalConfig.language);
		});
	});
