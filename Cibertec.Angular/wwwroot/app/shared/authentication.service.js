(function () {
    angular
        .module('app')
        .factory('authenticationService', authenticationService);
    authenticationService.$inject = ['$http', '$state','localStorageService', 'configService', '$q'];
    function authenticationService($http, $state, localStorageService,
        configService, $q) {
        var service = {};
        service.login = login;
        service.logout = logout;
        return service;
        function login(user) {
            var defer = $q.defer();
            var url = configService.getApiUrl() + '/token';
            $http.post(url, user)
                .then(function (result) {
                    $http.defaults.headers.common.Authorization = 'Bearer '
                        + result.data.access_Token;
                    localStorageService.set('userToken',
                        {
                            token: result.data.access_Token,
                            userName: user.userName
                        });
                    configService.setLogin(true);
                    defer.resolve(true);
                },
                function (error) {
                    defer.reject(false);
                });
            return defer.promise;
        }
        function logout() {
            $http.defaults.headers.common.Authorization = '';
            localStorageService.remove('userToken');
            configService.setLogin(false);
        }
    }
})();