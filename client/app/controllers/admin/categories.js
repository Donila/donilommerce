angular.module('Donilommerce')
	.controller('AdminCategoriesCtrl', function ($scope, $rootScope, Categories, locale) {

		init();

		$scope.findCategory = function(categoryId) {
			var found = _.find($scope.categories, { _id: categoryId });

			return found ? found.name : '';
		};

		$scope.new = function() {
			$scope.newCategory = {
				name: ''
			};
		};

		$scope.add = function() {
			Categories.create($scope.newCategory).then(function(result) {
				console.log(result);
				init();
				$scope.messages.push('Category added.');
			}, function(err) {
				$scope.errors.push(err);
			});

			$scope.newCategory = null;
		};

		$scope.startEdit = function(category) {
			if($scope.editedCategory && $scope.editedCategory._id == category._id) {
				$scope.editedCategory = null;
			} else {
				$scope.editedCategory = category;
				$scope.initialEditedCategory = angular.copy($scope.editedCategory);
			}
		};

		$scope.cancelEdit = function() {
			$scope.editedCategory = null;
		};

		$scope.delete = function(category) {
			Categories.delete(category._id).then(function(result) {
				console.log(result);
				init();
				$scope.messages.push('Category deleted.');
			}, function(err) {
				$scope.errors.push(err);
			});
		};

		$scope.save = function(category) {
			Categories.update(category).then(function(result) {
				console.log(result);
				init();
				$scope.messages.push('Category saved.');
			}, function(err) {
				$scope.errors.push(err);
			});

			$scope.newCategory = null;
		};

		function init() {
			$scope.loading = true;
			$scope.errors = [];
			$scope.messages = [];
			$scope.editedCategory = null;
			$scope.newCategory = null;
			$scope.listView = true;

			Categories.getAll().then(function(categories) {
				$scope.categories = categories;
				sortCategories();
				$scope.loading = false;
			}, function(err) {
				$scope.errors.push(err);
				$scope.loading = false;
			});
		}

		function sortCategories() {
			$scope.sortedCategories = [];

			_.forEach($scope.categories, function(c) {
				if(!c.parentCategory) {
					$scope.sortedCategories.push(c);
				}
			});

			_.forEach($scope.sortedCategories, function(sc) {
				teardownCategory(sc);
			});
		}

		function teardownCategory(iterativeCategory) {
			iterativeCategory.childs = [];
			_.forEach($scope.categories, function(c) {
				if(c.parentCategory == iterativeCategory._id) {
					iterativeCategory.childs.push(c);
				}
			});

			_.forEach(iterativeCategory.childs, function(child) {
				teardownCategory(child);
			});
		}
	});
