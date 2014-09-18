'use strict';

var services = angular.module('webperfApp.services', ['ngResource']);

// Automatic REST api generation, assuming we have a REST based service
services.factory('ResponseData', ['$resource', function ($resource) {
    return $resource('http://localhost:8080/responseData/:id', {id: '@id'});
}]);

// Demonstrating promise support in angular
services.factory('AllResponseData', ['ResponseData', '$q', function (ResponseData, $q) {

    return function() {
        var defCall = $q.defer();
        ResponseData.query(function (datas) {
            // Deferred call after receiving the data
            defCall.resolve(datas);
        }, function () {
            defCall.reject('Unable to get all response data');
        });
        return defCall.promise;
    };
}]);

services.factory('ResponseDataLoader', ['ResponseData', '$route', '$q', function(ResponseData, $route, $q) {
    // Get the current id from the route
    var id = $route.current.params.id;
    return function() {
        var defCall = $q.defer();
        // Simillar to above but we call get instead of query.
        ResponseData.get({id: id}, function (data) {
            defCall.resolve(data);
        }, function () {
            defCall.reject('Unable to get the response data for' + id);
        });
        return defCall.promise;
    };
}]);
