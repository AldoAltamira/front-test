'use strict';

angular.module('users').controller('UsersController', ['$scope', '$http', '$location', '$mdDialog', 'Authentication',
	function($scope, $http, $location, $mdDialog, Authentication) {

		$scope.authentication = Authentication;
		console.log('authentication', $scope.authentication);

		if (sessionStorage) {
			if (!sessionStorage.token) {
				$location.path('/login');
			}
		}
		// if (!$scope.authentication.user) {
		// 	$location.path('/login');
		// }

		$scope.logout = function() {
			sessionStorage.clear();
			$scope.authentication.user = null;
			$location.path('/login');
		}

		$scope.getList = function(search) {
			let haveSearch = search ? `?search=${search}` : '';
			var req = {
			   method: 'GET',
			   url: `http://localhost:3000/users/list${haveSearch}`,
			   headers: {
			      'Authorization': sessionStorage.token
			   },
			}
			$http(req).then(function(response) {
				console.log('response', response);
				$scope.users = response.data.data;
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
		};

		$scope.getCustomList = function(search) {
			var req = {
			   method: 'GET',
			   url: 'http://localhost:3000/users/customList',
			   headers: {
			      'Authorization': sessionStorage.token
			   },
			}
			$http(req).then(function(response) {
				console.log('response', response);
				$scope.customUsers = response.data.data;
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
		};

		$scope.delete = function(id) {
			var confirm = $mdDialog.confirm()
      .title('Desea eliminar este usuario')
      .textContent('No se podra recuperar una vez que se elimine')
      .ok('Eliminar')
      .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function () {
	      console.log('eliminar', id);
				var req = {
				   method: 'DELETE',
				   url: `http://localhost:3000/users/remove/${id}`,
				   headers: {
				      'Authorization': sessionStorage.token
				   },
				}
				$http(req).then(function(response) {
					console.log('response', response);
					$scope.users = $scope.users.filter(e => {
						return e._id !== id;
					});
					// $scope.getList();
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
	    }, function () {
	      console.log('cancel');
	    });
		}
	}
]);
