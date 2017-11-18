(function () {
    'use strict';
    angular.module('app', ['ui.router', 'LocalStorageModule','ui.bootstrap']);

})();
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
            .state("otherwise", {
                url: "/",
                templateUrl: "app/home.html"
            })
    }

})();
(function () {
    'use strict';
    angular.module('app').run(run).config(config);;

    run.$inject = ['$http', '$state', 'localStorageService','configService'];
    function run($http, $state, localStorageService, configService) {
        var user = localStorageService.get('userToken');
        if (user && user.token) {
            $http.defaults.headers.common.Authorization = 'Bearer '+localStorageService.get('userToken').token;
            configService.setLogin(true);
        }
        else $state.go('login');
    }

    config.$inject = ['$httpProvider'];

    function config($httpProvider) {
        $httpProvider.interceptors.push('appInterceptor');
    }
})();
(function () {
    'use strict';

    angular.module('app').service('appInterceptor', appInterceptor);

    appInterceptor.$inject = ['$q', '$state', 'configService', 'localStorageService'];

    function appInterceptor($q, $state, configService, localStorageService) {
        return {
            request: function (config) {
                var user = localStorageService.get('userToken');
                if (user && user.token) {
                    config.headers.Authorization = 'Bearer ' + user.token;
                    configService.setLogin(true);
                }
                return config;
            },
            responseError: function (response) {
                if (response.status == 401) {
                    return $state.go('login');
                }
                return $q.reject(response);
            }
        }
    }

})();
(function () {
    'use strict';
    angular.module('app').controller('applicationController', applicationController);


    applicationController.$inject = ['$scope', 'configService','authenticationService', 'localStorageService'];

    function applicationController($scope, configService, authenticationService, localStorageService) {
        var vm = this;
        vm.validate = validate;
        vm.logout = logout;

        $scope.init = function (url) {
            configService.setApiUrl(url);
        }
        function validate() {
            return configService.getLogin();
        }
        function logout() {
            authenticationService.logout();
        }
    }

})();