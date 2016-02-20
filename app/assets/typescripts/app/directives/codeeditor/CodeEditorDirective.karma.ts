/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var codeEditor: ng.IAugmentedJQuery, scope: raspi.directives.codeeditor.ICodeEditorScope;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        var $rootScope: ng.IScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        scope = <raspi.directives.codeeditor.ICodeEditorScope>$rootScope.$new();
        codeEditor= $compile("<code-editor></code-editor>")(scope);
        scope.$digest();
    }));

    describe("CodeEditorDirective", function() {
        it("sets the code on scope", function() {
            var code:string = "2.times { |i| puts i }";
            codeEditor.find("textarea").val(code);
            expect(scope.code).toEqual(code);
        });
    });

}