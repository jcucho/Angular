describe('dataService',function(){
    beforeEach(module('app'));

    it('Should be Ok',
        inject(function (dataService,$httpBackend){
            $httpBackend
            .expectGET('/test')
            .respond(200,'Ok');

            dataService.getData('/test').then(function 
            (response){
                expect(response.data).toEqual('Ok');
            });
        })
    );
    
    it('Should be Error',
        inject(function(dataService,$httpBackend){
            $httpBackend
            .expectGET('/error')
            .respond(400,'Error');

            dataService.getData('/error').then(function
            (response){
                expect(response.status).toEqual(400);
                expect(response.data).toEqual('Error');
            });

        })
    )
});