﻿(function () {
    'use strict';
    angular.module('app')
        .directive('supplierForm', supplierForm);
    function supplierForm() {
        return {
            restrict: 'E',
            scope: {
                supplier: '='
            },
            templateUrl: 'app/private/supplier/directives/supplier-form/supplier-form.html'
        };
    }
})();