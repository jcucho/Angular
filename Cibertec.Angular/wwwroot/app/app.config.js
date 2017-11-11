(function () {
    'use strict';
    angular.module('app').run(run);

    run.$inject = ['$http', '$state', 'localStorageService','configService'];
    function run($http, $state, localStorageService, configService) {
        var user = localStorageService.get('userToken');
        if (user && user.token) {
            $http.defaults.headers.common.Authorization = 'Bearer '+localStorageService.get('userToken').token;
            configService.setLogin(true);
        }
        else $state.go('login');
    }
})();