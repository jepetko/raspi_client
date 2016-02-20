/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var codeEditor: ng.IAugmentedJQuery, scope: raspi.directives.codeeditor.ICodeEditorScope;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        var $rootScope: ng.IScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        codeEditor = $compile("<code-editor></code-editor>")($rootScope.$new());
        scope = <raspi.directives.codeeditor.ICodeEditorScope>codeEditor.scope();
        scope.$digest();
    }));

    describe("CodeEditorDirective", function() {

        it("renders the given code", function() {
            scope.value = { code: "a = 1" };
            scope.$digest();
            expect(codeEditor.find("textarea").val()).toEqual("a = 1");
        });

        it("sets the code on scope", function() {
            var code:string = "2.times { |i| puts i }";
            codeEditor.find("textarea").val(code).trigger("input");
            expect(scope.value.code).toEqual(code);
        });
    });

}