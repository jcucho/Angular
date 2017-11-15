(function () {
    'use strict';

    angular.module('app').config(routeConfig);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider']
        
    function routeConfig($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("home", {
                url: "/home",
                templateUrl: "app/home.html"
            })
            .state("login", {
                url: "/login",
                templateUrl: "app/public/login/index.html"
            })
            .state("product", {
                url: "/product",
                templateUrl: 'app/private/product/index.html'
            })
            .state("customer", {
                url: "/customer",
                templateUrl: 'app/private/customer/index.html'
            })
            .state("supplier", {
                url: "/supplier",
                templateUrl: 'app/private/supplier/index.html'
            })
            .state("order", {
                url: "/order",
                templateUrl: 'app/private/order/index.html'
            })
            .state("orderitem", {
                url: "/orderitem",
                templateUrl: 'app/private/orderitem/index.html'
            })
            .state("otherwise", {
                url: "/",
                templateUrl: "app/home.html"
            })
    }

})();