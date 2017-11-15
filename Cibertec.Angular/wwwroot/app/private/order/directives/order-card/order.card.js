(function () {
    'use strict';
    angular.module('app')
        .directive('orderCard', orderCard);
    function orderCard() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                id: '@',
                orderDate: '@',
                orderNumber: '@',
                customerId: '@',
                totalAmount: '@'
            },
            templateUrl: 'app/private/order/directives/order-card/order-card.html'

        };
    }
})();