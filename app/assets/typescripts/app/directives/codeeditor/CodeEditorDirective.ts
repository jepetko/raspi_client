/// <reference path="../../references.ts"/>

module raspi.directives.codeeditor {

    interface IValue {
        code: string;
    }

    export interface ICodeEditorScope extends ng.IScope {
        value: IValue;
    }

    class CodeEditorDirective implements ng.IDirective {

        restrict = "E";
        scope = true;
        templateUrl = "app/directives/codeeditor/codeeditor.html";

        link: ng.IDirectiveLinkFn = (scope: ICodeEditorScope, element: JQuery, attrs: ng.IAttributes) => {
            scope.value = {code: ""};
        }
    }

    app.directive("codeEditor", [() => { return new CodeEditorDirective(); }]);
}