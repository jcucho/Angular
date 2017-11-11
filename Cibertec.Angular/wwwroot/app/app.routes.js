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
            .state("otherwise", {
                url: "/",
                templateUrl: "app/home.html"
            })
    }

})();