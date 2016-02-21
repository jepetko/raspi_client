/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var commandBar: ng.IAugmentedJQuery, scope: raspi.directives.commandbar.ICommandbarScope;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        var $rootScope: ng.IScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        scope = <raspi.directives.commandbar.ICommandbarScope>$rootScope.$new();
        commandBar = $compile("<command-bar></command-bar>")(scope);
        scope.$digest();
    }));

    describe("command bar", function() {
        it("contains the play button", function() {
            expect(commandBar.find(".glyphicon-play")[0]).toBeDefined();
        });
    });

    describe("command bar behavior", function() {

        var $httpBackend: ng.IHttpBackendService;

        beforeEach(inject(function(_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.whenPOST("http://192.168.0.100:9292/snippets", {code: 'puts "hello"'}).respond({
            });
        }));

        it("saves the snippet", function() {
            scope.code = 'puts "hello"';
            var playBtn = commandBar.find(".glyphicon-play");
            playBtn.click();
            $httpBackend.flush();
        });
    });
}