'use strict';

/**
 * @ngdoc overview
 * @name webperfApp
 * @description
 * # webperfApp
 *
 * Main module of the application.
 */
angular
  .module('webperfApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'webperfApp.directives',
    'webperfApp.services',
    'webperfApp.controllers'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/all', {
        templateUrl: 'views/all.html',
        controller: 'GetAllCtrl',
        resolve: {
          responseDatas: function(AllResponseData) {
            return new AllResponseData();
          }
        }
      })
      .when('/edit/:id', {
        templateUrl: 'views/response-form.html',
        controller: 'CreateEditCtrl',
        resolve: {
          responseData: function(ResponseDataLoader) {
            return new ResponseDataLoader();
          }
        }
      })
      .when('/new', {
        templateUrl: 'views/response-form.html',
        controller: 'CreateEditCtrl', // or 'CreateCtrl', but I have cleverly merged them
        resolve: {
          responseData: function() {
            return null;
          }
        }
      })
      .otherwise({
        redirectTo: '/all'
      });
  });
