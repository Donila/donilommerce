angular.module('Donilommerce').directive('donConfirmClick', [
	function(){
		return {
			link: function (scope, element, attr) {
				var msg = attr.donConfirmClick || "Are you sure?";
				var clickAction = attr.donConfirmedClick;
				element.bind('click',function (event) {
					if ( window.confirm(msg) ) {
						scope.$eval(clickAction)
					}
				});
			}
		};
	}]);
