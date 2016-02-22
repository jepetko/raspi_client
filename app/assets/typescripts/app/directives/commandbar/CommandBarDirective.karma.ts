/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var commandBar: ng.IAugmentedJQuery,
        $rootScope: ng.IScope,
        scope: raspi.directives.commandbar.ICommandbarScope;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        commandBar = $compile("<command-bar code='{{model.code}}'></command-bar>")($rootScope);
        scope = <raspi.directives.commandbar.ICommandbarScope>commandBar.scope();
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
            $httpBackend.whenPOST("http://localhost:9292/snippets", {code: 'puts "hello"'}).respond({
            });
        }));

        it("saves the snippet", function() {
            $rootScope["model"] = { code: 'puts "hello"' };
            $rootScope.$digest();

            var playBtn = commandBar.find(".glyphicon-play");
            playBtn.click();
            $httpBackend.flush();
        });
    });
}