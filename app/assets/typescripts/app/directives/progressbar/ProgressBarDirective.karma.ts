/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var progressBar:ng.IAugmentedJQuery, scope:raspi.directives.progressbar.IProgressBarScope,
        $rootScope: ng.IRootScopeService;

    beforeEach(function () {
        raspi.karma.module("app");
    });

    beforeEach(inject(function ($injector) {
        var $compile:ng.ICompileService = $injector.get("$compile");
        $rootScope = $injector.get("$rootScope");
        progressBar = $compile("<progress-bar></progress-bar>")($rootScope.$new());
        scope = <raspi.directives.progressbar.IProgressBarScope>progressBar.scope();
        scope.$digest();
    }));

    describe("progress bar", function() {
        it("shows itself when http request is performed", function() {
            $rootScope.$broadcast("http.state", {pending: 1});
            $rootScope.$digest();
            expect(progressBar.hasClass("ng-hide")).toBe(false);
        });

        it("hides itself when there is no pending http request", function() {
            $rootScope.$broadcast("http.state", {pending: 0, done: 1});
            $rootScope.$digest();
            expect(progressBar.hasClass("ng-hide")).toBe(true);
        });
    });

}