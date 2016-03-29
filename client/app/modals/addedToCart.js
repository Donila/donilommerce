angular.module('Donilommerce').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, lastAdded) {
	$scope.lastAdded = lastAdded;

	$scope.ok = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
