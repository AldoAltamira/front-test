'use strict';

angular.
  module('users').
  component('login', {
    templateUrl: 'users/views/signin.view.html',
    controller: 'AuthenticationController'
  }).
	component('signup', {
    templateUrl: 'users/views/signup.view.html',
    controller: 'AuthenticationController'
  }).
  component('list', {
    templateUrl: 'users/views/list.view.html',
    controller: 'UsersController'
  }).
  component('customlist', {
    templateUrl: 'users/views/customList.view.html',
    controller: 'UsersController'
  });
