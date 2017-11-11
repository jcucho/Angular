(function () {
    'use strict';
    angular.module('app')
        .directive('customerCard', customerCard);
    function customerCard() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                id: '@',
                firstName: '@',
                lastName: '@',
                city: '@',
                country: '@',
                phone: '@'
            },
            templateUrl: 'app/private/customer/directives/customer-card/customer-card.html'

        };
    }
})();