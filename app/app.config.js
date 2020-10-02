'use strict';

angular.
  module('frontTest').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/login', {
          template: '<login></login>'
        }).
        when('/signup', {
          template: '<signup></signup>'
        }).
        when('/list', {
          template: '<list></list>'
        }).
        when('/customlist', {
          template: '<customlist></customlist>'
        }).
        otherwise('/login');
    }
  ]);
