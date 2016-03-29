angular.module('Donilommerce')
	.factory('Language', function ($rootScope, $cookies, globalConfig, localeSupported, localeFallbacks, locale) {
		return {
			init: function() {
				var language = this.get();

				if(!language) {
					$.get("http://ipinfo.io", function(response) {
						var ruCountries = [ 'BY', 'RU', 'UA', 'KZ' ];
						if(ruCountries.indexOf(response.country) > -1) {
							var language = localeFallbacks.ru;

							$cookies.put('globalLanguage', language);

							locale.setLocale(language);
						}
					}, "jsonp");
				}
			},

			set: function(language) {
				$cookies.put('globalLanguage', language);

				locale.setLocale(language);
			},

			get: function() {
				var language = $cookies.get('globalLanguage');

				return language;
			}
		}
	});
