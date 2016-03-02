/// <reference path="../references.karma.ts"/>

module raspi.karma {

    var $rootScope: ng.IRootScopeService,
        scope: ng.IScope,
        $httpBackend: ng.IHttpBackendService,
        $http: ng.IHttpService,
        eventHandler: {handle: (event: ng.IAngularEvent) => any};

    var setupBackend = function(status, request, response) {
        $httpBackend.whenGET("http://localhost/dummy").respond(status || 200, response);
    };

    beforeEach(function () {
        raspi.karma.module("app");
    });

    beforeEach(inject(function ($injector) {
        $rootScope = $injector.get("$rootScope");
        scope = $rootScope.$new();
        $httpBackend = <ng.IHttpBackendService>$injector.get("$httpBackend");
        $http = <ng.IHttpService>$injector.get("$http");
        eventHandler = {
            handle: (event: ng.IAngularEvent) => {
            }
        };
    }));

    describe("interceptor", function() {
        beforeEach(function() {
            spyOn(eventHandler, "handle").and.callThrough();
        });

        it("recognizes http requests", function() {
            scope.$on("http.request", eventHandler.handle);
            setupBackend(200, {}, {});

            $http.get("http://localhost/dummy");
            $httpBackend.flush();

            expect(eventHandler.handle).toHaveBeenCalledWith(jasmine.objectContaining({name: "http.request"}));
        });

        it("recognizes http responses", function() {
            scope.$on("http.response", eventHandler.handle);
            setupBackend(200, {}, {});

            $http.get("http://localhost/dummy");
            $httpBackend.flush();

            expect(eventHandler.handle).toHaveBeenCalledWith(jasmine.objectContaining({name: "http.response"}));
        });

        it("broadcasts current http state", function() {

            scope.$on("http.state", eventHandler.handle);

            for(var i=0;i<5;i++) {
                setupBackend(200, {}, {});
                $http.get("http://localhost/dummy");
            }
            $httpBackend.flush(4);

            expect(eventHandler.handle).toHaveBeenCalledWith(jasmine.objectContaining({name: "http.state"}), {running: 1, done: 4});
        });
    });
}