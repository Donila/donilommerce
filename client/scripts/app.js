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
	.module('clientApp', [
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
		appNameKey: 'Shop'
	})
	.constant('_', window._)
	.run(function($rootScope, locale, Products) {
		$rootScope._ = window._;
		$rootScope.locale = locale;
		$rootScope.getLocale = locale.getLocale;
		$rootScope.setLocale = locale.setLocale;
		$rootScope.cartLength = Products.cartLength;
		$rootScope.cartCost = Products.cartCost;
		locale.ready('common').then(function () {
			locale.setLocale('en-US');
		});
	});
