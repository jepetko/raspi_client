/// <reference path="../../references.karma.ts"/>

module raspi.karma {

    var codeEditor: ng.IAugmentedJQuery,
        $rootScope: ng.IScope,
        scope: raspi.directives.codeeditor.ICodeEditorScope,
        aceEditor: any;

    beforeEach(function() {
        raspi.karma.module("app");
    });

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get("$rootScope");
        var $compile: ng.ICompileService = $injector.get("$compile");
        codeEditor = $compile('<code-editor code="model.code"></code-editor>')($rootScope);
        scope = <raspi.directives.codeeditor.ICodeEditorScope>codeEditor.scope();
        scope.$digest();
        aceEditor = window["ace"]["edit"](codeEditor[0]);
    }));

    describe("CodeEditorDirective", function() {

        it("renders the given code", function() {
            $rootScope["model"] = { code: "a = 1"}
            $rootScope.$digest();
            expect(aceEditor.getSession().getValue()).toEqual("a = 1");
        });

        it("sets the code on the scope", function() {
            $rootScope["model"] = { code: "" };
            $rootScope.$digest();

            var code:string = "2.times { |i| puts i }";

            aceEditor.getSession().setValue(code);
            //start a digest cycle because the value was set outside of the Angular framework
            $rootScope.$digest();

            expect($rootScope["model"]["code"]).toEqual(code);
        });
    });

}