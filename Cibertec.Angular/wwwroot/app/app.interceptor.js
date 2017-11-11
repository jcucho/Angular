(function () {
    'use strict';
    angular.module('app').service('appInterceptor', appInterceptor);
    angular.injector = ['$q', '$state'];
    function appInterceptor($q, $state) {
        return {
            responseError: function (response) {
                if (response.status == 401) {
                    return $state.go('login');
                }
                return $q.reject(response);
            }
        }
    }
})();