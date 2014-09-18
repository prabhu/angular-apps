'use strict';

var filters = angular.module('webperfApp.filters', []);

filters.filter('paginate', function() {
    return function(data, start) {
        start = +start;
        return data.slice(start);
    };
});
