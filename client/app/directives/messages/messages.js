angular.module('Donilommerce').directive('donMessages', function () {
	return {
		scope: {
			errors: '=',
			messages: '='
		},
		controller: function ($scope) {
			$scope.removeError = function(error) {
				$scope.errors = _.without($scope.errors, error);
			};

			$scope.removeMessage = function(message) {
				$scope.messages = _.without($scope.messages, message);
			};
		},

		templateUrl: 'app/directives/messages/messages.html'
	};
});
