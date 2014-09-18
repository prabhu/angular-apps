'use strict';

/**
 * @ngdoc function
 * @name webperfApp.directives:sameScopeInclude
 * @description
 * # sameScopeInclude
 * Include a template in the same scope
 */
var directives = angular.module('webperfApp.directives', []);

directives.directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                if (value) {
                    if (!/^(http):\/\//i.test(value) && 'http://'.indexOf(value) === -1) {
                        controller.$setViewValue('http://' + value);
                        controller.$render();
                        return 'http://' + value;
                    } else {
                        return value;
                    }
                } else {
                    return 'http://www.';
                }
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
});
