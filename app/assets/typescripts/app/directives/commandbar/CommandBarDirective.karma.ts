/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var commandBar: ng.IAugmentedJQuery,
        $rootScope: raspi.directives.codeeditor.IWrapperScope,
        $httpBackend: ng.IHttpBackendService,
        scope: raspi.directives.commandbar.ICommandbarScope;

    var setupBackend = function(status, request, response) {
        return function() {
            $httpBackend.whenPOST("http://localhost:9292/snippets", request).respond(status || 200, response);
        };
    }

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        $httpBackend = $injector.get("$httpBackend");
        var $compile: ng.ICompileService = $injector.get("$compile");
        commandBar = $compile("<command-bar code='{{model.code}}' exit-code='model.exitCode' output='model.output' status='model.status'></command-bar>")($rootScope);
        $rootScope.$digest();
        scope = <raspi.directives.commandbar.ICommandbarScope>commandBar.isolateScope();
    }));

    describe("command bar", function() {
        it("contains the play button", function() {
            expect(commandBar.find(".glyphicon-play")[0]).toBeDefined();
        });
    });

    describe("command bar behavior", function() {

        describe("code valid", function() {

            beforeEach(setupBackend(200, {code: 'puts "hello"'}, {
                output: 'hello',
                exit_code: 0
            }));

            it("saves the snippet and returns 0", function() {
                $rootScope.model = { code: 'puts "hello"' };
                $rootScope.$digest();

                var playBtn = commandBar.find(".glyphicon-play");
                playBtn.click();
                $httpBackend.flush();

                expect(scope.status).toBe(raspi.directives.commandbar.IStatus.SUCCESS);
                expect($rootScope.model.output).toEqual("hello");
                expect($rootScope.model.exitCode).toBe(0);
            });
        });

        describe("code invalid", function() {

            beforeEach(setupBackend(200, {code: 'this is not a valid ruby code'}, {
                output: '',
                exit_code: -1
            }));

            it("saves the snippet and returns -1 because the code is invalid", function() {

                $rootScope.model = { code: 'this is not a valid ruby code' };
                $rootScope.$digest();

                var playBtn = commandBar.find(".glyphicon-play");
                playBtn.click();
                $httpBackend.flush();

                expect(scope.status).toBe(raspi.directives.commandbar.IStatus.SUCCESS);
                expect($rootScope.model.output).toEqual("");
                expect($rootScope.model.exitCode).toBe(-1);
            });
        });

        describe("failure (http code 500)", function() {

            beforeEach(setupBackend(500, {code: 'puts "hello"'}, {
                output: '',
                exit_code: -1
            }));

            it("saves the snippet and returns -1 and ERROR because there was a server error", function() {
                $rootScope.model = { code: 'puts "hello"' };
                $rootScope.$digest();

                var playBtn = commandBar.find(".glyphicon-play");
                playBtn.click();
                $httpBackend.flush();

                expect(scope.status).toBe(raspi.directives.commandbar.IStatus.ERROR);
                expect($rootScope.model.output).toBe("");
                expect($rootScope.model.exitCode).toBe(-1);
            });
        })
    });

}