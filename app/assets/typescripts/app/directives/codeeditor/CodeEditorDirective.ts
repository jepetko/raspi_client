/// <reference path="../../references.ts"/>

module raspi.directives.codeeditor {

    export interface ICodeEditorScope extends ng.IScope {
        code: string;
    }

    class CodeEditorDirective implements ng.IDirective {

        restrict = "E";
        replace = true;
        scope = {
            code: "="
        };
        templateUrl = "app/directives/codeeditor/codeeditor.html";

        link: ng.IDirectiveLinkFn = (scope: ICodeEditorScope, element: JQuery, attrs: ng.IAttributes) => {
        }
    }

    app.directive("codeEditor", [() => { return new CodeEditorDirective(); }]);
}