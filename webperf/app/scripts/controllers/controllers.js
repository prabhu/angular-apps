'use strict';

/**
 * @ngdoc function
 * @name webperfApp.controller:responseInputCtrl
 * @description
 * # responseInputCtrl
 * Controller of the response input form
 */
var app = angular.module('webperfApp.controllers', []);

app.controller('IndexCtrl', ['$scope', function ($scope) {
    $scope.username = 'Guest';
}]);

app.controller('GetAllCtrl', ['$scope', 'responseDatas', function ($scope, responseDatas) {
    $scope.responseDatas = responseDatas;
}]);

app.controller('DisplayCtrl', ['$scope', '$location', 'responseData', function($scope, $location, responseData) {
    $scope.responseData = responseData;

    // Support for dynamic edit link!
    $scope.edit = function() {
        $location.path('/edit/', responseData.id);
    };
}]);

app.controller('CreateEditCtrl', ['$scope', '$location', 'responseData', 'ResponseData', function($scope, $location, responseData, ResponseData) {
    if (responseData) {
        $scope.responseData = responseData;
    } else {
        $scope.responseData = new ResponseData({ created: new Date() });
    }

    // After saving go home
    $scope.save = function() {
        $scope.responseData.$save(function () {
            $location.path('/all');
        });
    };

    // After deleting go to the home
    $scope.remove = function() {
        $scope.responseData.$delete(function() {
            $location.path('/all');
        });
    };
}]);

app.controller('CreateCtrl', ['$scope', '$location', 'ResponseData', function($scope, $location, ResponseData) {
    $scope.responseData = new ResponseData({ created: new Date() });
    // After saving go home
    $scope.save = function() {
        $scope.responseData.$save(function () {
            $location.path('/all');
        });
    };
}]);
