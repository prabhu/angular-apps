'use strict';

/**
 * @ngdoc function
 * @name webperfApp.controller:responseInputCtrl
 * @description
 * # responseInputCtrl
 * Controller of the response input form
 */
var app = angular.module('webperfApp.controllers', ['highcharts-ng']);

app.controller('IndexCtrl', ['$scope', function ($scope) {
    $scope.username = 'Guest';
}]);

app.controller('GetAllCtrl', ['$scope', 'responseDatas', function ($scope, responseDatas) {
    $scope.responseDatas = responseDatas;
    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.responseDatas.length / $scope.pageSize);
    };
}]);

app.controller('DisplayCtrl', ['$scope', '$location', 'responseData', function($scope, $location, responseData) {
    $scope.responseData = responseData;

    // Support for dynamic edit link!
    $scope.edit = function() {
        $location.path('/edit/', responseData.id);
    };
}]);

app.controller('DisplayStatsCtrl', ['$scope', 'responseDatas', function($scope, responseDatas) {
    $scope.responseDatas = responseDatas;
    $scope.predicate = 'id';
    $scope.reverse = false;
    $scope.currentPage = 0;
    $scope.pageSize = 20;
    $scope.url = null;
    $scope.range = 100;
    $scope.numberOfPages=function(){
        return Math.ceil($scope.responseDatas.length / $scope.pageSize);
    };
    $scope.redraw = function() {
        $scope.ranges = {};
        $scope.barData = [];
        responseDatas.forEach(function (adata) {
            if (!$scope.url) {
                $scope.url = adata.url;
            }
            var time = adata.time;
            var closestRange = Math.ceil(time / $scope.range) * $scope.range;
            var oldValue = $scope.ranges[closestRange] || 0;
            $scope.ranges[closestRange] = oldValue + 1;
        });
        var categories = [];
        for (var key in $scope.ranges) {
            categories.push(key);
            $scope.barData.push($scope.ranges[key]);
        }
        $scope.chartConfig = {
            chart: {
                type: 'column'
            },

            xAxis: {
                categories: categories
            },

            plotOptions: {
                column: {
                    groupPadding: 0,
                    pointPadding: 0,
                    borderWidth: 0
                }
            },
            title: {
                text: 'Response histogram'
            },
            series: [{
                data: $scope.barData
            }]
        };
    };

    $scope.redraw();
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
