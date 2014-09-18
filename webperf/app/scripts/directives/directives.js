'use strict';

var directives = angular.module('webperfApp.directives', []);

// Automatically prefix http://www for input fields
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
                } else { // Without www textfield with type=url will not work
                    return 'http://www.';
                }
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.push(ensureHttpPrefix);
        }
    };
});
