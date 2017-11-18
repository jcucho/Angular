describe('App Login',function(){
    var controller, service;
    beforeEach(function(){module('app');});

    beforeEach(inject(function($controller,
    _authenticationService_,$q){
        service = _authenticationService_ ;
        spyOn(service,"login").and.callFake(function(user){
            var deferred = $q.defer();
            deferred.resolve('Response');
            return deferred.promise;
        });
        spyOn(service,'logout').and.callFake(function(){
            var deferred = $q.defer();
            deferred.resolve('Response');
            return deferred.promise;
        });

        controller = $controller('loginController',{
            authenticationService: service
        });

    }));

    describe('Test',function(){
        it('Login',inject(function(){
            controller.login();
            expect(controller.showError).toEqual(false);
        }));
    });
});    