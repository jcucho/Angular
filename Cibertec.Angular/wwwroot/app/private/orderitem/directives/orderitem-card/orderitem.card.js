(function () {
    'use strict';
    angular.module('app')
        .directive('orderitemCard', orderitemCard);
    function orderitemCard() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                id: '@',
                orderId: '@',
                productId: '@',
                unitPrice: '@',
                quantity: '@'
            },
            templateUrl: 'app/private/orderitem/directives/orderitem-card/orderitem-card.html'

        };
    }
})();