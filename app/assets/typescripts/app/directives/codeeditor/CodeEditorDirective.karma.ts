/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var codeEditor: ng.IAugmentedJQuery,
        $rootScope: ng.IScope,
        scope: raspi.directives.codeeditor.ICodeEditorScope;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        codeEditor = $compile('<code-editor code="model.code"></code-editor>')($rootScope);
        scope = <raspi.directives.codeeditor.ICodeEditorScope>codeEditor.scope();
        scope.$digest();
    }));

    describe("CodeEditorDirective", function() {

        it("renders the given code", function() {
            $rootScope["model"] = { code: "a = 1"}
            $rootScope.$digest();
            expect(codeEditor.find("textarea").val()).toEqual("a = 1");
        });

        it("sets the code on the scope", function() {
            $rootScope["model"] = { code: "" };
            $rootScope.$digest();
            var code:string = "2.times { |i| puts i }";
            codeEditor.find("textarea").val(code).trigger("input");
            expect($rootScope["model"]["code"]).toEqual(code);
        });
    });

}