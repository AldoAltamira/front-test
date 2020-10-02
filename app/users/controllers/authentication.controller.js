'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', '$mdDialog', 'Authentication',
	function($scope, $http, $location, $mdDialog, Authentication) {

		$scope.authentication = Authentication;

		$scope.user = {
			gender: 'Male'
		};

		$scope.signin = function(valid) {
			if (valid) {
				$http.post('http://localhost:3000/users/login', $scope.credentials)
				.then(function(response) {
					console.log('response', response);
					$scope.authentication.user = response.data.data;
					sessionStorage.token = response.data.data;
					$location.path('/list');
				}, function(errorResponse) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('Error')
						.textContent(errorResponse.data.message)
						.ariaLabel('Error dialog')
						.ok('Aceptar')
						.targetEvent()
					);
				});
			}
		};

		$scope.signup = function(valid) {
			if (valid) {
				console.log('user', $scope.user);
				$http.post('http://localhost:3000/users/newUser', $scope.user)
				.then(function(response) {
					console.log('response', response);
					$scope.authentication.user = response.data.token;
					sessionStorage.token = response.data.token;
					$location.path('/list');
				}, function(errorResponse) {
					$mdDialog.show(
						$mdDialog.alert()
						.parent(angular.element(document.querySelector('#popupContainer')))
						.clickOutsideToClose(true)
						.title('Error')
						.textContent(errorResponse.data.message)
						.ariaLabel('Error dialog')
						.ok('Aceptar')
						.targetEvent()
					);
				});
			}
		}
	}
]);
