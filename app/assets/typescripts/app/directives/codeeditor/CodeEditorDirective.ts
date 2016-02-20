/// <reference path="../../references.karma.ts"/>

module raspi.directives.codeeditor {

    export interface ICodeEditorScope extends ng.IScope {
        code: string;
    }

    class CodeEditorDirective implements ng.IDirective {

        restrict = "E";
        templateUrl = "app/directives/codeeditor/codeeditor.html";
        link = (scope: ICodeEditorScope, element: JQuery, attrs: ng.IAttributes) => {
        }
    }

}