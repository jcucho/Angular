(function () {
    'use strict';
    angular.module('app')
        .directive('orderitemForm', orderitemForm);
    function orderitemForm() {
        return {
            restrict: 'E',
            scope: {
                orderitem: '='
            },
            templateUrl: 'app/private/orderitem/directives/orderitem-form/orderitem-form.html'
        };
    }
})();