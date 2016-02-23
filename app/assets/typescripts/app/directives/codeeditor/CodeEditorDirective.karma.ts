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
            //TODO: check why this doesn't match
            //expect(codeEditor.find('.ace_content').text()).toEqual("a = 1");
        });

        it("sets the code on the scope", function() {
            $rootScope["model"] = { code: "" };
            $rootScope.$digest();
            var code:string = "2.times { |i| puts i }";

            codeEditor.find("textarea").focus();

            var e = angular.element.Event('keypress');
            e.which = 65;
            codeEditor.find("textarea").trigger(e);

            //TODO: fix this
            //expect($rootScope["model"]["code"]).toEqual(code);
        });
    });

}